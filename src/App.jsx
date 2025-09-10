import './App.css'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import AuthCallback from './pages/callbackex'
import Landing from './pages/Landing'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trading" element={<Landing />} />
          <Route path="/disaster-report" element={<Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
