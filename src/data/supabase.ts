import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bvylycduddqamuxkthty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2eWx5Y2R1ZGRxYW11eGt0aHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNDMwMzMsImV4cCI6MjAwNjgxOTAzM30.lCcmZks_3au11-3VXdIBBDvl98m8g3p1nEZmqAHbEuM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
