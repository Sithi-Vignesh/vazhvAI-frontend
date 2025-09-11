import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { signOutUser } from '../scripts';
import { useUser } from '../context/UserContext';
import FarmerTrading from '../components/trading/FarmerTrading';
import BuyerTrading from '../components/trading/BuyerTrading';
import TradingLoading from '../components/trading/TradingLoading';
import '../components/trading/TradingStyles.css';

function NavLink({ to, children }) {
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

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Trading() {
  const { user, userProfile, loading, isFarmer, isBuyer, fetchUserProfile } = useUser();
  const [fallbackProfile, setFallbackProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !userProfile && !loading && !fallbackProfile) {
      const defaultProfile = {
        id: user.id,
        full_name: user.user_metadata?.full_name || "User",
        role: "Buyer", // Default role
        address: "Not specified"
      };
      setFallbackProfile(defaultProfile);
    }
  }, [user, userProfile, loading, fallbackProfile]);

  const handleSignOut = () => {
    signOutUser().then(() => navigate('/login'));
  };
  const handleLogin = () => navigate('/login');
  const handleProfile = () => navigate('/profile');

  if (loading) {
    return <TradingLoading />;
  }

  if (!user) {
    return (
      <>
        <Header user={null} handleLogin={handleLogin} />
        <div className="trading-container">
          <div className="trading-card">
            <h2>Please log in to access trading</h2>
            <p>You need to be logged in to view the trading platform.</p>
          </div>
        </div>
      </>
    );
  }

  const currentProfile = userProfile || fallbackProfile;
  if (!currentProfile) {
    return (
      <>
        <Header user={user} handleProfile={handleProfile} handleSignOut={handleSignOut} />
        <div className="trading-container">
          <div className="trading-card">
            <h2>Loading your profile...</h2>
            <p>Please wait while we load your trading profile.</p>
          </div>
        </div>
      </>
    );
  }

  const isCurrentFarmer = currentProfile?.role === "Farmer";
  const isCurrentBuyer = currentProfile?.role === "Buyer";

  return (
    <>
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
          <NavLink to="/landing">Home</NavLink>
          <NavLink to="/trading">Trading</NavLink>
          <NavLink to="/disaster-report">Disaster Report</NavLink>
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
      <div style={{ paddingTop: '80px' }}>
        <div className="trading-container">
          {isCurrentFarmer && <FarmerTrading userProfile={currentProfile} />}
          {isCurrentBuyer && <BuyerTrading userProfile={currentProfile} />}
          {!isCurrentFarmer && !isCurrentBuyer && (
            <div className="trading-card">
              <h2>Role Not Assigned</h2>
              <p>Please contact support to assign your role (Farmer or Buyer).</p>
              <p>Current profile: {JSON.stringify(currentProfile)}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Trading