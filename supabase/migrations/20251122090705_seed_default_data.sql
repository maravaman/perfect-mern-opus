/*
  # Seed Default Data
  
  ## Overview
  Populates tables with default data for app types, web app types, and examples
  
  ## Data Seeded
  - App development types (Shopping, Ride Booking, Food Delivery, etc.)
  - App examples (Amazon, Uber, Swiggy, etc.)
  - Web app types (E-commerce, SaaS, CRM, PWA)
  - Web app examples (Shopify, HubSpot, etc.)
  - Default tools (OpenAI, Gemini)
*/

-- Seed app development types
INSERT INTO app_development_types (name, description, display_order)
SELECT * FROM (VALUES
  ('Shopping Apps', 'E-commerce and retail applications', 1),
  ('Ride Booking', 'Transportation and ride-sharing apps', 2),
  ('Food Delivery', 'Restaurant and food delivery services', 3),
  ('Social Media', 'Social networking and communication apps', 4),
  ('Utility Apps', 'Productivity and utility applications', 5),
  ('Finance Apps', 'Payment and financial management apps', 6),
  ('Health & Fitness', 'Health tracking and wellness apps', 7)
) AS v(name, description, display_order)
WHERE NOT EXISTS (SELECT 1 FROM app_development_types LIMIT 1);

-- Seed app examples
INSERT INTO app_development_examples (type_id, name, display_order)
SELECT type_id, name, display_order FROM (
  SELECT 
    (SELECT id FROM app_development_types WHERE name = 'Shopping Apps') as type_id,
    'Amazon' as name,
    1 as display_order
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Shopping Apps'), 'Flipkart', 2
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Ride Booking'), 'Uber', 1
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Ride Booking'), 'Ola', 2
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Ride Booking'), 'Rapido', 3
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Food Delivery'), 'Swiggy', 1
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Food Delivery'), 'Zomato', 2
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Social Media'), 'Facebook', 1
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Social Media'), 'Instagram', 2
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Utility Apps'), 'Google Keep', 1
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Utility Apps'), 'Microsoft Office', 2
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Finance Apps'), 'Paytm', 1
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Finance Apps'), 'Google Pay', 2
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Finance Apps'), 'PhonePe', 3
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Health & Fitness'), 'Practo', 1
  UNION ALL
  SELECT (SELECT id FROM app_development_types WHERE name = 'Health & Fitness'), 'HealthifyMe', 2
) AS examples
WHERE NOT EXISTS (SELECT 1 FROM app_development_examples LIMIT 1);

-- Seed web app types
INSERT INTO web_app_types (name, description, display_order)
SELECT * FROM (VALUES
  ('E-commerce', 'Online shopping platforms', 1),
  ('SaaS Platforms', 'Software as a Service applications', 2),
  ('CRM Systems', 'Customer relationship management', 3),
  ('Progressive Web Apps', 'Modern web applications with app-like experience', 4)
) AS v(name, description, display_order)
WHERE NOT EXISTS (SELECT 1 FROM web_app_types LIMIT 1);

-- Seed web app examples
INSERT INTO web_app_examples (type_id, name, display_order)
SELECT type_id, name, display_order FROM (
  SELECT 
    (SELECT id FROM web_app_types WHERE name = 'E-commerce') as type_id,
    'Shopify' as name,
    1 as display_order
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'E-commerce'), 'Flipkart Web', 2
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'SaaS Platforms'), 'HubSpot', 1
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'SaaS Platforms'), 'Salesforce', 2
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'CRM Systems'), 'Zoho CRM', 1
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'CRM Systems'), 'Real Estate Portals', 2
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'Progressive Web Apps'), 'Twitter Lite', 1
  UNION ALL
  SELECT (SELECT id FROM web_app_types WHERE name = 'Progressive Web Apps'), 'Pinterest PWA', 2
) AS examples
WHERE NOT EXISTS (SELECT 1 FROM web_app_examples LIMIT 1);

-- Seed default tools
INSERT INTO tools (name, description, icon, color_from, color_to, features, capabilities, use_cases, display_order)
SELECT * FROM (VALUES
  (
    'OpenAI',
    'Harness the power of GPT models for advanced AI solutions',
    'Bot',
    'green-500',
    'emerald-600',
    ARRAY['Natural language processing', 'Content generation and copywriting', 'Code generation and debugging', 'Conversation AI and chatbots', 'Language translation', 'Text summarization and analysis'],
    '[{"icon": "MessageSquare", "text": "Chat & Conversational AI"}, {"icon": "Code", "text": "Code Generation"}, {"icon": "Sparkles", "text": "Creative Writing"}, {"icon": "Image", "text": "DALL-E Image Generation"}]'::jsonb,
    ARRAY['Customer support automation', 'Content creation at scale', 'Software development assistance', 'Educational tutoring systems'],
    1
  ),
  (
    'Gemini AI',
    'Google''s most capable AI model for multimodal understanding',
    'Sparkles',
    'blue-500',
    'cyan-600',
    ARRAY['Multimodal processing (text, images, video)', 'Advanced reasoning and problem-solving', 'Long-context understanding', 'Real-time information processing', 'Code understanding and generation', 'Document analysis and extraction'],
    '[{"icon": "Zap", "text": "Lightning Fast Processing"}, {"icon": "Image", "text": "Image & Video Analysis"}, {"icon": "Code", "text": "Advanced Code Understanding"}, {"icon": "MessageSquare", "text": "Contextual Conversations"}]'::jsonb,
    ARRAY['Complex data analysis', 'Multimodal content creation', 'Research and document processing', 'Advanced automation workflows'],
    2
  )
) AS v(name, description, icon, color_from, color_to, features, capabilities, use_cases, display_order)
WHERE NOT EXISTS (SELECT 1 FROM tools LIMIT 1);
