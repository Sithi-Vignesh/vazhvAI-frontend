import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, ShoppingBag, Brain, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [showLeaves, setShowLeaves] = useState(false);
  const navigate = useNavigate();

  const triggerLeafShower = () => {
    setShowLeaves(true);
    setTimeout(() => setShowLeaves(false), 4000); // longer shower
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLearnMore = () => {
    navigate('/landing');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  const styles = {
    page: {
      fontFamily: "sans-serif",
      backgroundColor: "#f9fafb",
      color: "#111",
      minHeight: "100vh",
      width: "100vw",
      overflowX: "hidden",
      margin: 0,
      padding: 0,
      scrollBehavior: "smooth",
    },
    hero: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(to bottom, #d9f99d, #fff)",
      padding: "0 24px",
    },
    section: {
      padding: "80px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gap: "24px",
    },
    animatedTitle: {
      display: "inline-block",
      fontSize: "36px",
      fontWeight: "800",
      textAlign: "center",
      marginBottom: "48px",
      background: "linear-gradient(90deg, #16a34a, #22c55e)",
      WebkitBackgroundClip: "text",
      color: "transparent",
      position: "relative",
      cursor: "default",
    },
    underline: {
      position: "absolute",
      left: 0,
      bottom: -4,
      height: "4px",
      width: 0,
      backgroundColor: "#16a34a",
      transition: "width 0.5s ease",
    },
    button: (variant = "solid", size = "md") => ({
      padding: size === "lg" ? "12px 24px" : "8px 16px",
      fontSize: size === "lg" ? "18px" : "14px",
      fontWeight: "600",
      borderRadius: "12px",
      border: variant === "outline" ? "2px solid #22c55e" : "none",
      backgroundColor: variant === "outline" ? "transparent" : "#22c55e",
      color: variant === "outline" ? "#16a34a" : "#fff",
      cursor: "pointer",
      transition: "all 0.3s ease",
      ':hover': {
        backgroundColor: variant === "outline" ? "#f0fdf4" : "#16a34a",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
      },
    }),
    card: {
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease, boxShadow 0.3s ease",
      padding: "24px",
      textAlign: "center",
    },
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
    leafShower: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      overflow: "hidden",
      zIndex: 2,
    },
  };

  // Animated Titles with underline hover effect
  const AnimatedTitle = ({ children }) => {
    const underlineRef = React.useRef(null);
    const handleMouseEnter = () =>
      underlineRef.current && (underlineRef.current.style.width = "100%");
    const handleMouseLeave = () =>
      underlineRef.current && (underlineRef.current.style.width = "0");

    return (
      <motion.h2
        style={styles.animatedTitle}
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <span ref={underlineRef} style={styles.underline}></span>
      </motion.h2>
    );
  };

  // Feature, Step, Demo Cards
  const FeatureCard = ({ icon, title, desc }) => {
    const [hover, setHover] = useState(false);
    return (
      <motion.div
        style={{ ...styles.card, ...(hover ? styles.cardHover : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={{ marginBottom: "16px" }}>{icon}</div>
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
          {title}
        </h3>
        <p style={{ color: "#555" }}>{desc}</p>
      </motion.div>
    );
  };

  const StepCard = ({ step, title, desc }) => {
    const [hover, setHover] = useState(false);
    return (
      <motion.div
        style={{
          ...styles.card,
          borderRadius: "24px",
          ...(hover ? styles.cardHover : {}),
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontWeight: "bold",
            animation: "bounce 1s infinite",
          }}
        >
          {step}
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
          {title}
        </h3>
        <p style={{ color: "#555" }}>{desc}</p>
      </motion.div>
    );
  };


  const DemoCard = ({ label }) => {
    const [hover, setHover] = useState(false);
    return (
      <motion.div
        style={{ ...styles.card, ...(hover ? styles.cardHover : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            height: "192px",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
          }}
        >
          <span>{label}</span>
        </div>
      </motion.div>
    );
  };

  // Leaf bouncing next to text
  const AnimatedLeaf = () => (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        gap: "12px",
        marginBottom: "16px",
      }}
      onClick={triggerLeafShower}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Leaf size={48} color="#16a34a" />
      <h1
        style={{
          fontSize: "64px",
          fontWeight: "800",
          background: "linear-gradient(90deg,#16a34a,#22c55e)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        VazhvAI
      </h1>
    </motion.div>
  );

  // Smooth Leaf Shower
  const LeafShower = () => {
    const leaves = Array.from({ length: 25 });
    return (
      <div style={styles.leafShower}>
        {leaves.map((_, i) => {
          const startX = Math.random() * window.innerWidth;
          const scale = 0.5 + Math.random() * 0.8;
          const duration = 4 + Math.random() * 2;
          return (
            <motion.div
              key={i}
              initial={{
                y: -50,
                x: startX,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: window.innerHeight + 50,
                opacity: 1,
                rotate: Math.random() * 360,
              }}
              transition={{ duration, ease: "linear" }}
              style={{ position: "absolute", scale }}
            >
              <Leaf size={24} color="#16a34a" />
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Bounce keyframes for StepCard (robust injection)
  useEffect(() => {
    try {
      let styleSheet = document.styleSheets[0];
      if (!styleSheet) {
        const styleEl = document.createElement('style');
        styleEl.setAttribute('data-dynamic', 'true');
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;
      }
      const rule = `@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`;
      // Avoid duplicate insertion
      const exists = Array.from(styleSheet.cssRules || []).some(r => r.name === 'bounce');
      if (!exists) {
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
      }
    } catch (e) {
      // Silent fail if stylesheet injection not permitted
    }
  }, []);

  return (
    <div style={styles.page}>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
        `}
      </style>
      {/* Hero */}
      <section style={styles.hero}>
        {showLeaves && <LeafShower />}
        <AnimatedLeaf />
        <p style={{ maxWidth: "600px", margin: "16px auto 32px" }}>
          Empowering Farmers. Connecting Buyers. A peer-to-peer trading platform
          for crops with AI-powered damage detection.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button 
            style={styles.button("solid", "lg")}
            onClick={handleGetStarted}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#16a34a";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#22c55e";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Get Started
          </button>
          <button 
            style={styles.button("outline", "lg")}
            onClick={handleLearnMore}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f0fdf4";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features */}
      <motion.section
        style={styles.section}
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <AnimatedTitle>Features</AnimatedTitle>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          }}
        >
          <FeatureCard
            icon={<ShoppingBag size={40} color="#16a34a" />}
            title="Direct Marketplace"
            desc="Farmers sell directly to buyers."
          />

          <FeatureCard
            icon={<Brain size={40} color="#16a34a" />}
            title="AI Crop Detection"
            desc="AI detects crop damage and provides reports."
          />
          <FeatureCard
            icon={<AlertTriangle size={40} color="#16a34a" />}
            title="Disaster Alerts"
            desc="Timely alerts for early action."
          />
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        style={{ ...styles.section, backgroundColor: "#dcfce7" }}
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <AnimatedTitle>How It Works</AnimatedTitle>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          }}
        >
          <StepCard
            step="1"
            title="Farmers Upload"
            desc="Upload crop listings or images."
          />
          <StepCard
            step="2"
            title="Buyers Purchase"
            desc="Buyers place direct orders."
          />
          <StepCard
            step="3"
            title="AI Assists"
            desc="AI detects crop damage and reports."
          />
        </div>
      </motion.section>

      {/* Platform Preview */}
      <motion.section
        style={styles.section}
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
      >
        <AnimatedTitle>Platform Preview</AnimatedTitle>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          }}
        >
          <DemoCard label="Crop Listing UI Demo" />
          <DemoCard label="AI Damage Detection Demo" />
        </div>
      </motion.section>


      {/* Call to Action */}
      <motion.section
        style={{ ...styles.section, textAlign: "center", paddingBottom: "40px" }}
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
      >
        <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "24px" }}>
          Join the Future of Farming Today with VazhvAI
        </h2>
        <button
          style={{
            ...styles.button("solid", "lg"),
            animation: "pulse 2s infinite",
          }}
          onClick={handleSignUp}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#16a34a";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
            e.target.style.animation = "none";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#22c55e";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
            e.target.style.animation = "pulse 2s infinite";
          }}
        >
          Sign Up Now
        </button>
      </motion.section>
    </div>
  );
}