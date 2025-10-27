import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContactInquiry = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
};

export type Service = {
  id?: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
  display_order?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PricingPlan = {
  id?: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  display_order?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
};
