import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      checkAdminRole(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      checkAdminRole(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const { data, error } = await supabase
      .rpc('get_user_role', { check_user_id: user.id });

    if (!error && data === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Use the database function to check role
    const { data: roleData, error: roleError } = await supabase
      .rpc('get_user_role', { check_user_id: data.user.id });

    console.log('Role check:', { roleData, roleError, userId: data.user.id });

    if (roleError) {
      console.error('Role check error:', roleError);
      await supabase.auth.signOut();
      throw new Error('Unable to verify admin privileges. Please contact support.');
    }

    if (roleData !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Access denied. Admin privileges required.');
    }

    toast.success('Logged in successfully!');
    navigate('/admin/dashboard');
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;

    await supabase.from('user_roles').insert({
      user_id: data.user!.id,
      role: 'user',
    });

    toast.success('Account created successfully!');
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setIsAdmin(false);
    toast.success('Logged out successfully!');
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
