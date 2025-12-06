-- Create job_openings table for career page
CREATE TABLE public.job_openings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full Time',
  location TEXT NOT NULL DEFAULT 'Remote',
  experience TEXT NOT NULL DEFAULT '1-2 years',
  description TEXT,
  category TEXT DEFAULT 'General',
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage job openings"
ON public.job_openings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active job openings"
ON public.job_openings
FOR SELECT
USING (active = true);

-- Add trigger for updated_at
CREATE TRIGGER update_job_openings_updated_at
BEFORE UPDATE ON public.job_openings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Insert initial job openings data
INSERT INTO public.job_openings (title, type, location, experience, description, category, display_order) VALUES
('Digital Marketing Executive', 'Full Time', 'Hyderabad / Remote', '1-3 years', 'Looking for a passionate digital marketer with expertise in SEO, social media, and content marketing.', 'Marketing', 1),
('Web Developer', 'Full Time', 'Hyderabad / Remote', '2-4 years', 'Seeking an experienced web developer proficient in React, Node.js, and modern web technologies.', 'Development', 2),
('Graphic Designer', 'Full Time / Part Time', 'Hyderabad / Remote', '1-2 years', 'Creative designer needed for social media graphics, branding, and marketing materials.', 'Design', 3),
('Content Writer', 'Full Time / Freelance', 'Remote', '1-3 years', 'Looking for talented content writers with SEO knowledge and creative writing skills.', 'Content', 4);