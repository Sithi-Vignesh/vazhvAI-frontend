import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import AuthCallback from './pages/callbackex';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import StartPage from './pages/StartPage'; // ✅ match component name
import Trading from "./pages/Trading";
import TradingDashboard from './components/TradingDashboard';
import DisasterDashboard from './components/DisasterDashboard';
import Navbar from './components/Navbar';
import { supabase } from './supabaseClient';
import { signOutUser } from './scripts';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    async function getUser() {
      if (!supabase) {
        if (isMounted) setUser(null);
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (isMounted) setUser(data?.user || null);
    }
    getUser();

    const sub = supabase
      ? supabase.auth.onAuthStateChange(() => {
          getUser();
        })
      : null;
    return () => {
      isMounted = false;
      sub?.data?.subscription?.unsubscribe?.();
    };
  }, []);

  const handleSignOut = () => {
    if (supabase) {
      signOutUser().finally(() => { window.location.assign('/login'); });
    } else {
      window.location.assign('/login');
    }
  };
  const handleLogin = () => { window.location.assign('/login'); };
  const handleProfile = () => { window.location.assign('/profile'); };

  return (
    <UserProvider>
      <div
        className="App"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',       // ✅ make full width
        }}
      >
        {!(location.pathname === '/' || location.pathname === '/login') && (
          <Navbar
            user={user}
            handleLogin={handleLogin}
            handleSignOut={handleSignOut}
            handleProfile={handleProfile}
          />
        )}
        {/* Main content area */}
        <main style={{ flex: 1, width: '100%', paddingTop: (location.pathname === '/' || location.pathname === '/login') ? 0 : 72 }}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/disaster-report" element={<DisasterDashboard />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/trading-dashboard" element={<TradingDashboard />} />
          </Routes>
        </main>

        {/* Footer pinned at bottom */}
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
