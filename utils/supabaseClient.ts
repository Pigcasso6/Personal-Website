import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Project 1
const SUPABASE_URL_1 = 'https://lwwfxjiixaltbedvassi.supabase.co';
const SUPABASE_ANON_KEY_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d2Z4amlpeGFsdGJlZHZhc3NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMDIzNDIsImV4cCI6MjA4MDU3ODM0Mn0.zOfwiQ_AmUT_NuK7rXF2t7mgaO-QluU39i_KQMLw3qw';

// Project 2
const SUPABASE_URL_2 = 'https://vmufksfltadyjwhogplf.supabase.co';
const SUPABASE_ANON_KEY_2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtdWZrc2ZsdGFkeWp3aG9ncGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MjU1ODcsImV4cCI6MjA4MDUwMTU4N30.KgjCQ4BFbtVtNMFze5on9lBduGAiKRTm539mjCCt77w';

export const supabase = createClient(SUPABASE_URL_1, SUPABASE_ANON_KEY_1);
export const supabase2 = createClient(SUPABASE_URL_2, SUPABASE_ANON_KEY_2);

/**
 * Ping function to increment counter on page load for both Supabase projects
 */
async function pingProject(client: SupabaseClient, projectName: string) {
  try {
    // 1. Try atomic RPC function first
    const { error: rpcError } = await client.rpc('increment_counter');
    if (!rpcError) {
      return;
    }

    // 2. Fallback: direct select and update
    const { data } = await client
      .from('counter')
      .select('count')
      .eq('id', 1)
      .maybeSingle();

    if (data) {
      const newCount = (Number(data.count) || 0) + 1;
      await client
        .from('counter')
        .update({ count: newCount, updated_at: new Date().toISOString() })
        .eq('id', 1);
    } else {
      await client
        .from('counter')
        .upsert({ id: 1, count: 1, updated_at: new Date().toISOString() });
    }
  } catch (error) {
    console.warn(`[Supabase KeepAlive] Ping error for ${projectName}:`, error);
  }
}

export async function recordVisitorPing() {
  // Run ping asynchronously in background without blocking UI
  Promise.allSettled([
    pingProject(supabase, 'Project 1'),
    pingProject(supabase2, 'Project 2'),
  ]);
}
