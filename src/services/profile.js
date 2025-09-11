import { supabase } from "../supabaseClient";

export async function checkProfileExists() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return { exists: false, error: userError };

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id) // assuming id is FK to auth.users.id
    .single();

  if (error && error.code === "PGRST116") {
    // PGRST116 = "No rows found"
    return { exists: false };
  } else if (error) {
    console.error("Profile check error:", error);
    return { exists: false, error };
  }

  return { exists: true, profile: data };
}