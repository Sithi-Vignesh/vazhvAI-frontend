// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // or wherever you're importing this from

function CustomNavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      style={{
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
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.background = 'rgba(22, 101, 52, 0.08)';
          e.target.style.color = '#166534';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 12px rgba(22, 101, 52, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.background = 'transparent';
          e.target.style.color = '#374151';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }
      }}
    >
      {children}
    </Link>
  );
}

const Navbar = ({ user, handleLogin, handleSignOut, handleProfile }) => {
  const navigate = useNavigate();

  return (
    <header
      className="nav"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '72px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
        zIndex: 100,
        boxSizing: 'border-box',
        padding: '0 32px',
        transition: 'all 0.3s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="brand"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontWeight: 800,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '8px 12px',
          borderRadius: '12px',
          fontSize: '18px',
        }}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
          e.currentTarget.style.background = 'rgba(22, 101, 52, 0.08)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 101, 52, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span
          className="brand-dot"
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e, #166534)',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(22, 101, 52, 0.2)',
          }}
        ></span>
        <span>vazhvAI</span>
      </div>

      <nav style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
        <CustomNavLink to="/landing">Home</CustomNavLink>
        <CustomNavLink to="/trading">Trading</CustomNavLink>
        <CustomNavLink to="/disaster-report">Disaster Report</CustomNavLink>
      </nav>

      <div className="actions" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <button
              onClick={handleProfile}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22, 101, 52, 0.1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #166534)',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(22, 101, 52, 0.2)',
                }}
              />
            </button>
            <button
              onClick={handleSignOut}
              style={{
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #b91c1c, #991b1b)';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 2px 4px rgba(220, 38, 38, 0.2)';
              }}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
              e.target.style.transform = 'translateY(-2px) scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 2px 4px rgba(34, 197, 94, 0.2)';
            }}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;