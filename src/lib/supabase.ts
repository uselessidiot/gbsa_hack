import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database, Company, AnalysisResult, SupportProgram, CompanyB2BProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-supabase-url.supabase.co' &&
    supabaseUrl.startsWith('https://')
  );
};

// Lazy initialization or null client when unconfigured to prevent app crashes
export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Supabase Data Helper Methods
 * Automatically switches to mock data or direct DB calls depending on environment configuration.
 */
export const supabaseService = {
  /**
   * Fetch all analyzed companies
   */
  async getCompanies(): Promise<Company[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('companies').select('*');
    if (error) {
      console.error('Supabase fetch error (getCompanies):', error);
      return [];
    }
    return data || [];
  },

  /**
   * Fetch analysis result by ID
   */
  async getAnalysisById(id: string): Promise<AnalysisResult | null> {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Supabase fetch error (getAnalysisById):', error);
      return null;
    }
    return data;
  },

  /**
   * Save or update an analysis result
   */
  async saveAnalysis(analysis: AnalysisResult): Promise<boolean> {
    if (!supabase) return false;
    const { error } = await supabase.from('analyses').upsert(analysis as any);
    if (error) {
      console.error('Supabase save error (saveAnalysis):', error);
      return false;
    }
    return true;
  },

  /**
   * Fetch all support programs
   */
  async getSupportPrograms(): Promise<SupportProgram[]> {
    if (!supabase) return [];
    const { data, error } = await supabase.from('support_programs').select('*');
    if (error) {
      console.error('Supabase fetch error (getSupportPrograms):', error);
      return [];
    }
    return data || [];
  }
};
