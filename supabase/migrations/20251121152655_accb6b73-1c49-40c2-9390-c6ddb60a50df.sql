-- Create app_types table
CREATE TABLE public.app_types (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  display_order integer,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create app_examples table
CREATE TABLE public.app_examples (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  app_type_id uuid NOT NULL REFERENCES public.app_types(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_order integer,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create web_types table
CREATE TABLE public.web_types (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  display_order integer,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create web_examples table
CREATE TABLE public.web_examples (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  web_type_id uuid NOT NULL REFERENCES public.web_types(id) ON DELETE CASCADE,
  name text NOT NULL,
  display_order integer,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_examples ENABLE ROW LEVEL SECURITY;

-- RLS Policies for app_types
CREATE POLICY "Admins can manage app types"
ON public.app_types
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active app types"
ON public.app_types
FOR SELECT
USING (active = true);

-- RLS Policies for app_examples
CREATE POLICY "Admins can manage app examples"
ON public.app_examples
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active app examples"
ON public.app_examples
FOR SELECT
USING (active = true);

-- RLS Policies for web_types
CREATE POLICY "Admins can manage web types"
ON public.web_types
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active web types"
ON public.web_types
FOR SELECT
USING (active = true);

-- RLS Policies for web_examples
CREATE POLICY "Admins can manage web examples"
ON public.web_examples
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active web examples"
ON public.web_examples
FOR SELECT
USING (active = true);

-- Add triggers for updated_at
CREATE TRIGGER update_app_types_updated_at
BEFORE UPDATE ON public.app_types
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_app_examples_updated_at
BEFORE UPDATE ON public.app_examples
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_web_types_updated_at
BEFORE UPDATE ON public.web_types
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_web_examples_updated_at
BEFORE UPDATE ON public.web_examples
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();