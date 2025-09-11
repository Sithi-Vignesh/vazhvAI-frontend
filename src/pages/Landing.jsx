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

// (Removed team widget rendering from Landing)
function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M19.812 5.059c-.432 0-.795.347-.795.779c0 .431.363.779.795.779h2.384c.432 0 .795-.348.795-.779s-.363-.779-.795-.779H19.812zM2.871 3.447c-.432 0-.795.347-.795.779s.363.779.795.779h2.384c.432 0 .795-.348.795-.779s-.363-.779-.795-.779H2.871zm10.59 1.612c-3.153 0-5.714 2.561-5.714 5.714v5.378c0 3.153 2.561 5.714 5.714 5.714h3.692c3.153 0 5.714-2.561 5.714-5.714V10.77a5.714 5.714 0 0 0-5.714-5.714h-3.692zm.45 15.696c-1.077 0-1.954-.877-1.954-1.954V12.75h3.908v5.753c0 1.077-.877 1.954-1.954 1.954h-.05z" clipRule="evenodd" />
      <path d="M12.75 12.75V19c0 1.258.98 2.25 2.235 2.25h1.564c1.255 0 2.25-.992 2.25-2.25v-2.181a1.5 1.5 0 0 0-.547-1.144l-2.613-2.181a1.5 1.5 0 0 0-1.895-.213l-1.053.843Z" />
      <path d="M12.75 12.75V19c0 1.258.98 2.25 2.235 2.25h1.564c1.255 0 2.25-.992 2.25-2.25v-2.181a1.5 1.5 0 0 0-.547-1.144l-2.613-2.181a1.5 1.5 0 0 0-1.895-.213l-1.053.843Z" />
      <path d="M12.75 12.75V19c0 1.258.98 2.25 2.235 2.25h1.564c1.255 0 2.25-.992 2.25-2.25v-2.181a1.5 1.5 0 0 0-.547-1.144l-2.613-2.181a1.5 1.5 0 0 0-1.895-.213l-1.053.843Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M12.315 2.454a2.593 2.593 0 0 0-.61-.093c-.45.03-.89.155-1.297.35l-.01.005a3.469 3.469 0 0 0-.877.585l-.01.005a3.469 3.469 0 0 0-.585.877a2.593 2.593 0 0 0-.35 1.297c-.03.45.093.89.35 1.297a3.469 3.469 0 0 0 1.297 1.297a2.593 2.593 0 0 0 1.297-.35l.01-.005a3.469 3.469 0 0 0 .877-.585l.01-.005a3.469 3.469 0 0 0 .585-.877a2.593 2.593 0 0 0 .35-1.297c.03-.45-.093-.89-.35-1.297a3.469 3.469 0 0 0-1.297-1.297Zm2.185 1.62c-.785 0-1.423.638-1.423 1.423s.638 1.423 1.423 1.423s1.423-.638 1.423-1.423s-.638-1.423-1.423-1.423Z" clipRule="evenodd" />
      <path d="M12.315 2.454a2.593 2.593 0 0 0-.61-.093c-.45.03-.89.155-1.297.35l-.01.005a3.469 3.469 0 0 0-.877.585l-.01.005a3.469 3.469 0 0 0-.585.877a2.593 2.593 0 0 0-.35 1.297c-.03.45.093.89.35 1.297a3.469 3.469 0 0 0 1.297 1.297a2.593 2.593 0 0 0 1.297-.35l.01-.005a3.469 3.469 0 0 0 .877-.585l.01-.005a3.469 3.469 0 0 0 .585-.877a2.593 2.593 0 0 0 .35-1.297c.03-.45-.093-.89-.35-1.297a3.469 3.469 0 0 0-1.297-1.297Zm2.185 1.62c-.785 0-1.423.638-1.423 1.423s.638 1.423 1.423 1.423s1.423-.638 1.423-1.423s-.638-1.423-1.423-1.423Z" clipRule="evenodd" />
      <path d="M12.315 2.454a2.593 2.593 0 0 0-.61-.093c-.45.03-.89.155-1.297.35l-.01.005a3.469 3.469 0 0 0-.877.585l-.01.005a3.469 3.469 0 0 0-.585.877a2.593 2.593 0 0 0-.35 1.297c-.03.45.093-.89.35 1.297a3.469 3.469 0 0 0 1.297 1.297a2.593 2.593 0 0 0 1.297-.35l.01-.005a3.469 3.469 0 0 0 .877-.585l.01-.005a3.469 3.469 0 0 0 .585-.877a2.593 2.593 0 0 0 .35-1.297c.03-.45-.093-.89-.35-1.297a3.469 3.469 0 0 0-1.297-1.297Zm2.185 1.62c-.785 0-1.423.638-1.423 1.423s.638 1.423 1.423 1.423s1.423-.638 1.423-1.423s-.638-1.423-1.423-1.423Z" clipRule="evenodd" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12.003 2.551a10.05 10.05 0 0 0-.74-1.25c-1.49-.695-3.08-1.077-4.757-1.077c-3.13 0-5.659 2.555-5.659 5.652c0 2.213 1.49 4.1 3.528 5.092l.06.027l-1.396 5.564a.75.75 0 0 0 .95.95l5.564-1.396l.027.06c.992 2.038 2.879 3.528 5.092 3.528c3.097 0 5.652-2.555 5.652-5.659c0-1.677-.382-3.267-1.077-4.757a10.05 10.05 0 0 0-1.25-.74Z" />
    </svg>
  );
}

function getIconComponent(label) {
  switch (label) {
    case 'LinkedIn':
      return <LinkedInIcon />;
    case 'Instagram':
      return <InstagramIcon />;
    case 'WhatsApp':
      return <WhatsAppIcon />;
    default:
      return null;
  }
}

function TeamWidget() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const teamMembers = [
    { name: 'Takshak', socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/takshak' },
      { label: 'Instagram', href: 'https://instagram.com/takshak' },
      { label: 'WhatsApp', href: 'https://wa.me/1234567890' },
    ] },
    { name: 'Gokul', socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/gokul' },
      { label: 'Instagram', href: 'https://instagram.com/gokul' },
      { label: 'WhatsApp', href: 'https://wa.me/1234567891' },
    ] },
    { name: 'Sithi Vignesh', socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/sithivignesh' },
      { label: 'Instagram', href: 'https://instagram.com/sithivignesh' },
      { label: 'WhatsApp', href: 'https://wa.me/1234567892' },
    ] },
    { name: 'Shrish', socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/shrish' },
      { label: 'Instagram', href: 'https://instagram.com/shrish' },
      { label: 'WhatsApp', href: 'https://wa.me/1234567893' },
    ] },
    { name: 'Harshath', socialLinks: [
      { label: 'LinkedIn', href: 'https://linkedin.com/in/harshath' },
      { label: 'Instagram', href: 'https://instagram.com/harshath' },
      { label: 'WhatsApp', href: 'https://wa.me/1234567894' },
    ] },
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 880 }}>
        <footer style={{
          background: 'linear-gradient(135deg,#166534,#16a34a)',
          color: '#fef08a',
          borderRadius: 16,
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}>
          <div style={{ height: 4, background: 'linear-gradient(90deg,#fde047,#f59e0b,#fde047)' }} />
          <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fde68a' }}>VazhvilAI</h2>
              <div style={{ width: 96, height: 4, marginTop: 10, background: 'linear-gradient(90deg,transparent,#facc15,transparent)' }} />
              <p style={{ margin: '12px 0 0', color: '#fffcd1', textAlign: 'center', maxWidth: 560 }}>
                Empowering farmers and buyers through direct commerce and AI-driven insights.
              </p>
            </div>

            <div style={{ marginBottom: 22 }}>
              <h3 style={{ textAlign: 'center', color: '#fde68a', margin: '0 0 16px', fontWeight: 700 }}>Our Team</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
                {teamMembers.map((member) => (
                  <div key={member.name} style={{ position: 'relative' }}>
                    <button
                      onClick={() => toggleDropdown(member.name)}
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        padding: '10px 16px',
                        borderRadius: 999,
                        fontWeight: 600,
                        border: activeDropdown === member.name ? 'none' : '1px solid rgba(255,255,255,0.25)',
                        background: activeDropdown === member.name ? '#fde68a' : 'rgba(0,0,0,0.15)',
                        color: activeDropdown === member.name ? '#064e3b' : '#fef9c3',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        {member.name}
                        <svg style={{ width: 16, height: 16, transform: activeDropdown === member.name ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </button>
                    {activeDropdown === member.name && (
                      <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8, width: 224, animation: 'fade-in 0.25s ease-out forwards' }}>
                        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 50%) rotate(45deg)', width: 16, height: 16, background: 'rgba(6,78,59,0.95)', border: '1px solid rgba(255,255,255,0.16)' }} />
                        <div style={{ position: 'relative', background: 'rgba(6,78,59,0.95)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }}>
                          <div style={{ height: 4, background: 'linear-gradient(90deg,rgba(250,204,21,0.35),transparent)' }} />
                          <div style={{ padding: '8px 0' }}>
                            {member.socialLinks.map((link, idx) => (
                              <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: '#fefce8', textDecoration: 'none' }}>
                                <div style={{ padding: 6, borderRadius: 8, background: 'rgba(15,118,110,0.6)' }}>
                                  {getIconComponent(link.label)}
                                </div>
                                <span style={{ fontWeight: 600 }}>{link.label}</span>
                                <svg style={{ marginLeft: 'auto', width: 16, height: 16, color: '#fde68a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 18, marginBottom: 20, color: '#fffbe6' }}>
              <a href="https://github.com/your-team" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GitHub
              </a>
              <a href="https://instagram.com/your-team" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>
                <InstagramIcon /> Instagram
              </a>
              <a href="https://linkedin.com/in/your-team" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>
                <LinkedInIcon /> LinkedIn
              </a>
              <a href="mailto:yourteam@email.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Email
              </a>
              <a href="tel:+919876543210" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +91 98765 43210
              </a>
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.25)', textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
              <p style={{ margin: 0, fontSize: 13 }}>
                © {new Date().getFullYear()} VazhvilAI. All rights reserved.
              </p>
            </div>
          </div>
          <div style={{ height: 4, background: 'linear-gradient(90deg,#fde047,#f59e0b,#fde047)' }} />
        </footer>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}