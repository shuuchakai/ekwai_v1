import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmrohmeljejrbjfyvaii.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcm9obWVsamVqcmJqZnl2YWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjMwNDQ4MiwiZXhwIjoyMDI3ODgwNDgyfQ.a_vYfmt-uD5NGz1GxG7RFTVRPdARdLSgzn7ccusavfk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
