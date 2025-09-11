import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, ChevronDown, Sparkles, Heart, Star } from 'lucide-react';

// Team Member Dropdown Component
function TeamMemberDropdown({ name, socialLinks }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          padding: '12px 20px',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          minWidth: '150px',
          justifyContent: 'space-between',
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        {name}
        <ChevronDown 
          size={16} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }} 
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '12px',
            marginTop: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#166534',
                transition: 'all 0.2s ease',
                width: '40px',
                height: '40px',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f0fdf4';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

TeamMemberDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Animated Background Component
function AnimatedBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
    });

    const initialParticles = Array.from({ length: 20 }, createParticle);
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speed,
          opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.3 + 0.4,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '50%',
            opacity: particle.opacity,
            animation: 'twinkle 2s infinite ease-in-out',
          }}
        />
      ))}
    </div>
  );
}

// Floating Icons Component
function FloatingIcons() {
  const icons = [Sparkles, Heart, Star];
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const createIcon = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      delay: Math.random() * 2,
    });

    const initialIcons = Array.from({ length: 8 }, createIcon);
    setPositions(initialIcons);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      {positions.map((item, index) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: `${item.y}%`,
            animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
            animationDelay: `${item.delay}s`,
            opacity: 0.3,
          }}
        >
          <item.Icon size={16} color="#fef08a" />
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const navigate = useNavigate();
  
  // Team members data
  const teamMembers = [
    {
      name: "Gokul",
      socialLinks: [
        { icon: <Github size={18} color="#166534" />, label: "GitHub", url: "https://github.com/alexjohnson" },
        { icon: <Linkedin size={18} color="#166534" />, label: "LinkedIn", url: "https://linkedin.com/in/alexjohnson" },
        { icon: <Instagram size={18} color="#166534" />, label: "Instagram", url: "https://instagram.com/alexjohnson" },
        { icon: <Mail size={18} color="#166534" />, label: "Email", url: "mailto:alex@vazhvai.com" },
      ]
    },
    {
      name: "Takshak",
      socialLinks: [
        { icon: <Github size={18} color="#166534" />, label: "GitHub", url: "https://github.com/sarahchen" },
        { icon: <Linkedin size={18} color="#166534" />, label: "LinkedIn", url: "https://linkedin.com/in/sarahchen" },
        { icon: <Instagram size={18} color="#166534" />, label: "Instagram", url: "https://instagram.com/sarahchen" },
        { icon: <Mail size={18} color="#166534" />, label: "Email", url: "mailto:sarah@vazhvai.com" },
      ]
    },
    {
      name: "Sithi Vignesh",
      socialLinks: [
        { icon: <Github size={18} color="#166534" />, label: "GitHub", url: "https://github.com/mikerodriguez" },
        { icon: <Linkedin size={18} color="#166534" />, label: "LinkedIn", url: "https://linkedin.com/in/mikerodriguez" },
        { icon: <Instagram size={18} color="#166534" />, label: "Instagram", url: "https://instagram.com/mikerodriguez" },
        { icon: <Mail size={18} color="#166534" />, label: "Email", url: "mailto:mike@vazhvai.com" },
      ]
    },
    {
      name: "Shrish",
      socialLinks: [
        { icon: <Github size={18} color="#166534" />, label: "GitHub", url: "https://github.com/emmawilson" },
        { icon: <Linkedin size={18} color="#166534" />, label: "LinkedIn", url: "https://linkedin.com/in/emmawilson" },
        { icon: <Instagram size={18} color="#166534" />, label: "Instagram", url: "https://instagram.com/emmawilson" },
        { icon: <Mail size={18} color="#166534" />, label: "Email", url: "mailto:emma@vazhvai.com" },
      ]
    },
    {
      name: "Harshath",
      socialLinks: [
        { icon: <Github size={18} color="#166534" />, label: "GitHub", url: "https://github.com/davidkim" },
        { icon: <Linkedin size={18} color="#166534" />, label: "LinkedIn", url: "https://linkedin.com/in/davidkim" },
        { icon: <Instagram size={18} color="#166534" />, label: "Instagram", url: "https://instagram.com/davidkim" },
        { icon: <Mail size={18} color="#166534" />, label: "Email", url: "mailto:david@vazhvai.com" },
      ]
    }
  ];

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.2); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <footer
      style={{
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        width: '100%',
        background: 'linear-gradient(135deg, #166534, #22c55e)',
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: '32px',
        paddingBottom: '32px',
        marginTop: '64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <AnimatedBackground />
      <FloatingIcons />
      
      {/* Title */}
      <h2 
        style={{ 
          marginBottom: '16px', 
          fontWeight: 800, 
          fontSize: '32px',
          position: 'relative',
          zIndex: 2,
          color: '#fef08a',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        VazhvAI
      </h2>
      
      {/* Description */}
      <p 
        style={{ 
          marginBottom: '32px', 
          fontSize: '18px', 
          maxWidth: '600px', 
          margin: '0 auto 32px',
          position: 'relative',
          zIndex: 2,
          color: '#ffffff',
          fontWeight: '500',
        }}
      >
        Empowering farmers and buyers through direct commerce and AI-driven insights.
      </p>

      {/* Team Members Section */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 2 }}>
        <h3 
          style={{ 
            marginBottom: '24px', 
            fontSize: '24px', 
            fontWeight: '700',
            color: '#fef08a',
          }}
        >
          Meet Our Team
        </h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
            gap: '20px',
          flexWrap: 'wrap',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberDropdown
              key={index}
              name={member.name}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p 
        style={{ 
          fontSize: '16px', 
          color: '#ffffff',
          position: 'relative',
          zIndex: 1,
          fontWeight: '500',
        }}
      >
        &copy; {new Date().getFullYear()} VazhvilAI. All rights reserved.
      </p>
    </footer>
  );
}
