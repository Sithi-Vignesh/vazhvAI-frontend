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
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/trading-dashboard', { replace: true });
  }, [navigate]);
  return null;
}

export default Trading;