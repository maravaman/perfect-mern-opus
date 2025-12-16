import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input sanitization to prevent CSV/formula injection
function sanitizeForSheets(value: string | undefined): string {
  if (!value) return '';
  
  const trimmed = value.trim();
  
  // Prevent formula injection by prefixing dangerous characters with single quote
  // Characters that can trigger formula execution in spreadsheets: = + - @ |
  if (trimmed.match(/^[=+\-@|]/)) {
    return "'" + trimmed;
  }
  
  // Limit length to prevent abuse (1000 chars max)
  return trimmed.substring(0, 1000);
}

// Email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// URL validation for resume URLs
function isValidUrl(url: string | undefined): boolean {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, type, position, experience, resumeUrl } = await req.json();

    console.log('Received submission:', { name, email, phone, type: type || 'contact' });

    // Server-side validation
    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: name and email are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (resumeUrl && !isValidUrl(resumeUrl)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid resume URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize all user inputs to prevent formula injection
    const sanitizedName = sanitizeForSheets(name);
    const sanitizedEmail = sanitizeForSheets(email);
    const sanitizedPhone = sanitizeForSheets(phone);
    const sanitizedMessage = sanitizeForSheets(message);
    const sanitizedPosition = sanitizeForSheets(position);
    const sanitizedExperience = sanitizeForSheets(experience);
    const sanitizedResumeUrl = sanitizeForSheets(resumeUrl);

    // Get Google Sheets credentials from environment
    const privateKey = Deno.env.get('GOOGLE_SHEETS_PRIVATE_KEY');
    const clientEmail = Deno.env.get('GOOGLE_SHEETS_CLIENT_EMAIL');
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID');

    if (!privateKey || !clientEmail || !spreadsheetId) {
      throw new Error('Missing Google Sheets configuration');
    }

    // Format the private key (handle both \n and actual newlines)
    let formattedPrivateKey = privateKey;
    if (formattedPrivateKey.includes('\\n')) {
      formattedPrivateKey = formattedPrivateKey.replace(/\\n/g, '\n');
    }

    // Create JWT for Google Sheets API
    const header = {
      alg: 'RS256',
      typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const claim = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now
    };

    // Encode header and claim using base64url
    const base64url = (str: string) => {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedClaim = base64url(JSON.stringify(claim));
    const message_to_sign = `${encodedHeader}.${encodedClaim}`;

    // Import the private key
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    
    // Extract key content - handle various formats
    let pemContents = formattedPrivateKey;
    
    if (pemContents.includes(pemHeader)) {
      const startIndex = pemContents.indexOf(pemHeader) + pemHeader.length;
      const endIndex = pemContents.indexOf(pemFooter);
      pemContents = pemContents.substring(startIndex, endIndex);
    }
    
    // Remove all whitespace and newlines from the base64 content
    pemContents = pemContents.replace(/\s/g, '');

    console.log('PEM contents length:', pemContents.length);

    const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      false,
      ["sign"]
    );

    // Sign the JWT
    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      encoder.encode(message_to_sign)
    );

    // Convert signature to base64url
    const base64urlSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    const jwt = `${message_to_sign}.${base64urlSignature}`;

    console.log('JWT created, requesting access token');

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token request failed:', errorText);
      throw new Error(`Failed to get access token: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('Access token obtained, appending to sheet');

    // Append data to Google Sheets
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // Determine which sheet and data based on type (using sanitized values)
    let sheetName = 'Sheet1'; // Default for contact
    let values: string[][];

    if (type === 'career') {
      sheetName = 'Career Applications'; // Career submissions go to different sheet
      values = [[timestamp, sanitizedName, sanitizedEmail, sanitizedPhone, sanitizedPosition, sanitizedExperience, sanitizedMessage, sanitizedResumeUrl]];
    } else {
      sheetName = 'Contact Submissions'; // Contact submissions
      values = [[timestamp, sanitizedName, sanitizedEmail, sanitizedPhone, sanitizedMessage]];
    }

    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:H:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: values,
        }),
      }
    );

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      console.error('Sheets append failed:', errorText);
      throw new Error(`Failed to append to sheet: ${errorText}`);
    }

    const sheetsData = await sheetsResponse.json();
    console.log('Successfully added to Google Sheets:', sheetsData);

    return new Response(
      JSON.stringify({ success: true, message: 'Data added to Google Sheets' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-to-google-sheets function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An error occurred processing your request' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
