import React, { useState } from 'react'
import GoogleButton from '../components/GoogleButton'
import { supabase } from '../supabaseClient'

function Login() {
  const [loading, setLoading] = useState(false)
  
  async function signInWithGoogle() {
    if (!supabase) {
      alert('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_KEY and restart.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
        flowType: 'pkce'
      }
    });
    if (error) console.error("Error:", error);
  }

  function handleGoogleSignIn() {
    setLoading(true);
    signInWithGoogle();
  }

  return (
    <div className="page-center">
      <div className="auth-card" style={{ width: '100%', maxWidth: '440px' }}>
        <h2 className="auth-title">Login</h2>
        <p className="auth-subtitle">Use your Google account to continue.</p>

        <GoogleButton onClick={handleGoogleSignIn} disabled={loading || !supabase} />
        {!supabase && (
          <div style={{ marginTop: '12px', color: '#b91c1c', fontSize: '13px' }}>
            Missing Supabase configuration. Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_KEY</code> to your <code>.env</code>.
          </div>
        )}

      </div>
    </div>
  )
}

export default Login


