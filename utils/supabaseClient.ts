import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lwwfxjiixaltbedvassi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d2Z4amlpeGFsdGJlZHZhc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDIzNDIsImV4cCI6MjA4MDU3ODM0Mn0.zOfwiQ_AmUT_NuK7rXF2t7mgaO-QluU39i_KQMLw3qw';

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;