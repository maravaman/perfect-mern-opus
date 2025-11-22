/*
  # Add Update Triggers
  
  ## Overview
  Adds triggers to automatically update updated_at timestamps
  
  ## Triggers Added
  - All tables with updated_at columns
*/

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at 
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_blog_categories_updated_at ON blog_categories;
CREATE TRIGGER update_blog_categories_updated_at 
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at 
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_app_development_types_updated_at ON app_development_types;
CREATE TRIGGER update_app_development_types_updated_at 
  BEFORE UPDATE ON app_development_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_app_development_examples_updated_at ON app_development_examples;
CREATE TRIGGER update_app_development_examples_updated_at 
  BEFORE UPDATE ON app_development_examples
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_web_app_types_updated_at ON web_app_types;
CREATE TRIGGER update_web_app_types_updated_at 
  BEFORE UPDATE ON web_app_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_web_app_examples_updated_at ON web_app_examples;
CREATE TRIGGER update_web_app_examples_updated_at 
  BEFORE UPDATE ON web_app_examples
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_trusted_clients_updated_at ON trusted_clients;
CREATE TRIGGER update_trusted_clients_updated_at 
  BEFORE UPDATE ON trusted_clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_tools_updated_at ON tools;
CREATE TRIGGER update_tools_updated_at 
  BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
