-- Create offers_banner table for promotional banners on home page
CREATE TABLE public.offers_banner (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  link_url TEXT,
  link_text TEXT DEFAULT 'Learn More',
  background_color TEXT DEFAULT '#EBFBFF',
  text_color TEXT DEFAULT '#000000',
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.offers_banner ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active offers" 
ON public.offers_banner 
FOR SELECT 
USING (active = true);

CREATE POLICY "Admins can manage offers" 
ON public.offers_banner 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_offers_banner_updated_at
BEFORE UPDATE ON public.offers_banner
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();