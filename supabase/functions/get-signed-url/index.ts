import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    console.log('get-signed-url: Starting request');
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('get-signed-url: No authorization header');
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create a client with the user's token to verify they're an admin
    const userClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get the user
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      console.log('get-signed-url: User auth failed', userError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('get-signed-url: User authenticated:', user.id);

    // Check if user is admin using service role client
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: roleData, error: roleError } = await serviceClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (roleError || !roleData) {
      console.log('get-signed-url: Admin check failed', roleError);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('get-signed-url: Admin verified');

    // Parse request body
    const { filePath, bucket = 'knight21-uploads', download = false } = await req.json();
    
    console.log('get-signed-url: Requested file:', filePath, 'bucket:', bucket, 'download:', download);
    
    if (!filePath) {
      return new Response(
        JSON.stringify({ error: 'File path is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If download mode, fetch and return the file directly
    if (download) {
      console.log('get-signed-url: Download mode - fetching file directly');
      const { data: fileData, error: fileError } = await serviceClient.storage
        .from(bucket)
        .download(filePath);

      if (fileError) {
        console.error('get-signed-url: Error downloading file:', fileError);
        return new Response(
          JSON.stringify({ error: 'Failed to download file', details: fileError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get file extension for content type
      const ext = filePath.split('.').pop()?.toLowerCase();
      let contentType = 'application/octet-stream';
      if (ext === 'pdf') contentType = 'application/pdf';
      else if (ext === 'doc') contentType = 'application/msword';
      else if (ext === 'docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      const fileName = filePath.split('/').pop() || 'resume';

      console.log('get-signed-url: Returning file:', fileName, 'type:', contentType);

      return new Response(fileData, {
        headers: {
          ...corsHeaders,
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${fileName}"`,
        }
      });
    }

    // Generate signed URL using service role client (expires in 1 hour)
    const { data, error } = await serviceClient.storage
      .from(bucket)
      .createSignedUrl(filePath, 3600, {
        download: false,
      });

    if (error) {
      console.error('get-signed-url: Error creating signed URL:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create signed URL', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('get-signed-url: Signed URL created successfully');

    return new Response(
      JSON.stringify({ signedUrl: data.signedUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('get-signed-url: Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});