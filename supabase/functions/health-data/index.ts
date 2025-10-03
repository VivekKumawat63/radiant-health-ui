import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    const { action } = await req.json();

    if (action === 'get_summary') {
      // Fetch user's health data summary
      const [
        { data: medications },
        { data: appointments },
        { data: allergies },
        { data: healthMetrics }
      ] = await Promise.all([
        supabaseClient.from('medications').select('*').eq('user_id', user.id).eq('status', 'active'),
        supabaseClient.from('appointments').select('*').eq('user_id', user.id).gte('appointment_date', new Date().toISOString()),
        supabaseClient.from('allergies').select('*').eq('user_id', user.id),
        supabaseClient.from('health_metrics').select('*').eq('user_id', user.id).order('recorded_at', { ascending: false }).limit(4)
      ]);

      return new Response(
        JSON.stringify({
          medications,
          appointments,
          allergies,
          healthMetrics
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});