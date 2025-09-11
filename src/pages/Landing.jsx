import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { signOutUser } from '../scripts';
import '../App.css';



function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (

<NavLink
  to={to}
  style={({ isActive }) => ({
    padding: '10px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: isActive ? '#166534' : '#374151',
    background: isActive ? 'rgba(22, 101, 52, 0.1)' : 'transparent',
    fontWeight: 600,
    fontSize: '15px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  })}
  onMouseEnter={(e) => {
    e.target.style.background = 'rgba(22, 101, 52, 0.08)';
    e.target.style.color = '#166534';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 4px 12px rgba(22, 101, 52, 0.15)';
  }}
  onMouseLeave={(e) => {
    e.target.style.background = 'transparent';
    e.target.style.color = '#374151';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  }}
>
  {children}
</NavLink>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function Landing() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    }
    getUser();

    // Inject weather widget script
    const scriptId = 'weatherwidget-io-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://weatherwidget.io/js/widget.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSignOut = () => {
    signOutUser().then(() => navigate('/login'));
  };

  const handleLogin = () => navigate('/login');
  const handleProfile = () => navigate('/profile');

  return (
    <>
      {/* Navbar is rendered globally in App */}
    </>
  );
}