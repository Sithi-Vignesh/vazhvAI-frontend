import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import AuthCallback from './pages/callbackex';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import StartPage from './pages/StartPage'; // ✅ match component name
import Trading from "./pages/Trading";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
        {/* Main content area */}
        <main style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<StartPage />} /> {/* ✅ show StartPage first */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/disaster-report" element={<Landing />} />
            <Route path="/trading" element={<Trading />} />
          </Routes>
        </main>

        {/* Footer pinned at bottom */}
        <Footer />
      </div>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
