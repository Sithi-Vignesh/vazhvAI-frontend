import { supabase } from './supabaseClient';

export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirect to your frontend after OAuth (set in Supabase dashboard)
        // You can pass redirectTo here for more control
        redirectTo: window.location.origin + "/auth/callback"
      }
    });
    if (error) console.error("OAuth error:", error);
    return { data, error };
  }

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign-out error:", error);
  }
}