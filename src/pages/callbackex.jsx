import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AuthCallback() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      const name = data?.user?.user_metadata?.full_name || 'User';
      setUserName(name);

      // Optional: redirect after 2 seconds
      setTimeout(() => {
        navigate('/landing');
      }, 2000);
    }

    fetchUser();
  }, [navigate]);

  return (
    <div className="page-center">
      <div className="auth-card">
        <h2>Login Successful 🎉</h2>
        <p>Welcome, <strong>{userName}</strong>! Redirecting you shortly...</p>
      </div>
    </div>
  );
}