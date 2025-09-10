import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { signOutUser } from '../scripts'; // make sure the path is correct

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} style={{
      padding: '8px 10px',
      borderRadius: '8px',
      textDecoration: 'none',
      color: isActive ? '#166534' : '#111827',
      background: isActive ? 'rgba(22, 101, 52, 0.08)' : 'transparent',
      fontWeight: 600
    }}>
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default function Landing() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      if (supabase) {
        const { data } = await supabase.auth.getUser();
        setUser(data?.user || null);
      }
    }
    getUser();
  }, []);

  function handleSignOut() {
  signOutUser().then(() => {
    navigate('/login'); // redirect after sign-out
  });
  }

  function handleLogin() {
    navigate('/login');
  }
  function handleSignup() {
    navigate('/signup');
  }
  function handleProfile() {
    navigate('/profile');
  }

  return (
    <header className="nav" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '64px',
      background: '#fafafa',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 100,
      boxSizing: 'border-box',
      margin: 0,
      padding: '0 32px'
    }}>
      <div className="brand" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 800 }}>
        <span className="brand-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(180deg, #22c55e, #166534)' }}></span>
        <span>vazhvAI</span>
      </div>
      <nav style={{ display: 'inline-flex', gap: 8 }}>
        <NavLink to="/landing">Home</NavLink>
        <NavLink to="/trading">Trading</NavLink>
        <NavLink to="/disaster-report">Disaster Report</NavLink>
      </nav>
      <div className="actions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {user ? (
          <button onClick={handleProfile} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {/* Show avatar if available, else generic circle */}
            <span style={{ width: 28, height: 28, borderRadius: '9999px', background: '#e2e8f0', display: 'inline-block' }} />
          </button>
        ) : (
          <>
            <button onClick={handleLogin} className="btn btn-secondary">Login</button>
            <button onClick={handleSignup} className="btn">Sign Up</button>
          </>
        )}
        <button onClick={handleSignOut} className="btn btn-secondary">Sign Out</button>
      </div>
    </header>
  );
}


