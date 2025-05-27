import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://occlukfioavsasdqkghy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jY2x1a2Zpb2F2c2FzZHFrZ2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNDA5MDksImV4cCI6MjA2MzcxNjkwOX0.DVlcOReWTuL4rCUpY5kAW6LCo1b8lQRQ3uNGKUvIMHc';
export const supabase = createClient(supabaseUrl, supabaseKey);