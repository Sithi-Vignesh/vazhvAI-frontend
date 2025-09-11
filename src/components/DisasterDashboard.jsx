import { useEffect, useRef, useState } from 'react';
import './DisasterDashboard.css';

function useFontAwesome() {
  useEffect(() => {
    const id = 'fa-6-4-0-cdn';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);
}

function AnimatedBackground() {
  return (
    <>
      <div className="animated-bg" />
      <div className="floating-element" />
      <div className="floating-element" />
      <div className="floating-element" />
      <div className="floating-element" />
      <div className="floating-element" />
    </>
  );
}

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-main">
          <h2 className="main-heading">Disaster Management</h2>
          <p className="tagline">AI-Powered Crop Damage Detection System</p>
        </div>
      </div>
    </header>
  );
}

function HomeModules({ onOpen }) {
  return (
    <div className="modules-container" id="modulesContainer">
      <div className="modules-top">
        <div className="module module-top-left" onClick={() => onOpen('tool')}>
          <i className="fas fa-tools module-icon" />
          <h3 className="module-title">Try the Disaster Detection Tool</h3>
          <p className="module-description">Upload images of your crops to receive an instant AI-powered damage assessment report.</p>
        </div>
        <div className="module module-top-right" onClick={() => onOpen('how')}>
          <i className="fas fa-question-circle module-icon" />
          <h3 className="module-title">How to Use vazhvAI Disaster Management</h3>
          <p className="module-description">Learn the simple steps to use our system for detecting and assessing crop damage.</p>
        </div>
      </div>
      <div className="module module-bottom" onClick={() => onOpen('what')}>
        <i className="fas fa-check checkmark" />
        <i className="fas fa-info-circle module-icon" />
        <h3 className="module-title">What is vazhvAI Disaster Management?</h3>
        <p className="module-description">Discover how our AI-powered system helps farmers detect and assess crop damage caused by natural disasters, pests, and diseases.</p>
      </div>
    </div>
  );
}

function SectionWrapper({ id, active, iconClass, title, children, onBack }) {
  return (
    <section id={id} className={`section ${active ? 'active' : ''}`}>
      <button className="back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left" /> Back to Home
      </button>
      <h2 className="section-title">
        <i className={iconClass} />
        {title}
      </h2>
      {children}
    </section>
  );
}

function WhatIsSection({ active, onBack }) {
  return (
    <SectionWrapper id="what-is-it" active={active} iconClass="fas fa-info-circle" title="What is vazhvAI Disaster Management?" onBack={onBack}>
      <p>vazhvAI Disaster Management is an advanced AI-powered system designed to help farmers detect and assess crop damage caused by natural disasters, pests, and diseases. Our system uses cutting-edge computer vision technology to analyze images of crops and provide detailed reports on damage extent, type, and recommended actions.</p>

      <div className="feature-grid">
        <div className="feature-card">
          <h3><i className="fas fa-brain" /> AI-Powered Analysis</h3>
          <p>Our advanced algorithms analyze crop images to detect various types of damage with high accuracy, including pest infestations, disease outbreaks, and weather-related damage.</p>
        </div>
        <div className="feature-card">
          <h3><i className="fas fa-map-marked-alt" /> Damage Mapping</h3>
          <p>Generate detailed annotated images highlighting affected areas, helping farmers visualize the extent and location of damage across their fields.</p>
        </div>
        <div className="feature-card">
          <h3><i className="fas fa-file-alt" /> Comprehensive Reports</h3>
          <p>Receive detailed damage assessment reports with severity levels, affected crop percentages, and actionable recommendations to mitigate losses.</p>
        </div>
        <div className="feature-card">
          <h3><i className="fas fa-bell" /> Early Warning System</h3>
          <p>Get timely alerts about potential disaster risks in your area, allowing you to take preventive measures before damage occurs.</p>
        </div>
        <div className="feature-card">
          <h3><i className="fas fa-mobile-alt" /> Mobile-Friendly</h3>
          <p>Access our tools from any device, directly from your field. Upload images and receive reports on the go, without needing specialized equipment.</p>
        </div>
        <div className="feature-card">
          <h3><i className="fas fa-users" /> Community Support</h3>
          <p>Connect with other farmers and agricultural experts to share experiences, solutions, and support during challenging times.</p>
        </div>
      </div>
    </SectionWrapper>
  );
}

function HowToSection({ active, onBack }) {
  const steps = [
    { title: 'Capture Images', text: 'Take clear photos of your crops using your smartphone or camera. For best results, capture images in good lighting conditions and from multiple angles if possible.' },
    { title: 'Upload to vazhvAI', text: 'Upload your images using our easy-to-use interface. You can drag and drop files or click to browse your device. Multiple images can be uploaded at once.' },
    { title: 'AI Analysis', text: 'Our AI system will analyze your images to detect signs of damage, disease, or pest infestation. This process typically takes less than a minute.' },
    { title: 'Review Results', text: 'Examine the annotated images highlighting affected areas and review the detailed damage report with severity assessments and statistics.' },
    { title: 'Take Action', text: 'Follow the personalized recommendations provided in the report to address the identified issues and prevent further damage to your crops.' }
  ];

  return (
    <SectionWrapper id="how-to-use" active={active} iconClass="fas fa-question-circle" title="How to Use vazhvAI Disaster Management" onBack={onBack}>
      <p>Using our disaster management system is simple and straightforward. Follow these steps to get detailed analysis of your crops:</p>
      <div className="steps-container">
        {steps.map((s, i) => (
          <div className="step" key={i}>
            <div className="step-number">{i + 1}</div>
            <div className="step-content">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function UploadArea({ onFilesSelected }) {
  const fileInputRef = useRef(null);
  const onClick = () => fileInputRef.current?.click();

  useEffect(() => {
    const area = document.getElementById('uploadArea');
    if (!area) return;
    const onDragOver = (e) => { e.preventDefault(); area.classList.add('dragover'); };
    const onDragLeave = () => { area.classList.remove('dragover'); };
    const onDrop = (e) => {
      e.preventDefault();
      area.classList.remove('dragover');
      if (e.dataTransfer?.files?.length) onFilesSelected(e.dataTransfer.files);
    };
    area.addEventListener('dragover', onDragOver);
    area.addEventListener('dragleave', onDragLeave);
    area.addEventListener('drop', onDrop);
    return () => {
      area.removeEventListener('dragover', onDragOver);
      area.removeEventListener('dragleave', onDragLeave);
      area.removeEventListener('drop', onDrop);
    };
  }, [onFilesSelected]);

  return (
    <div className="upload-area" id="uploadArea" onClick={onClick}>
      <i className="fas fa-cloud-upload-alt" />
      <p>Drag and drop your crop images here or click to browse</p>
      <button className="upload-btn" onClick={(e) => { e.stopPropagation(); onClick(); }}>Select Images</button>
      <input ref={fileInputRef} type="file" className="file-input" multiple accept="image/*" onChange={(e) => e.target.files && onFilesSelected(e.target.files)} />
    </div>
  );
}

function ProgressAnalysis({ progress, status }) {
  return (
    <div className="analysis-container">
      <h3>Analyzing your images...</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <p>{status}</p>
    </div>
  );
}

function ResultsView({ onSave, onNew }) {
  return (
    <div className="results-container">
      <h3>Damage Assessment Report</h3>
      <div className="result-grid">
        <div className="image-container">
          <img src="https://picsum.photos/seed/cropfield/600/400.jpg" alt="Analyzed crop field" />
          <div className="damage-marker" style={{ top: '30%', left: '25%' }} />
          <div className="damage-marker" style={{ top: '60%', left: '70%' }} />
          <div className="damage-marker" style={{ top: '45%', left: '50%' }} />
        </div>
        <div className="damage-report">
          <h3>Damage Analysis</h3>
          <div className="damage-stat"><span className="stat-label">Overall Damage:</span><span className="stat-value severity-medium">Moderate (32%)</span></div>
          <div className="damage-stat"><span className="stat-label">Pest Damage:</span><span className="stat-value severity-low">Minimal (8%)</span></div>
          <div className="damage-stat"><span className="stat-label">Disease:</span><span className="stat-value severity-medium">Moderate (15%)</span></div>
          <div className="damage-stat"><span className="stat-label">Weather Damage:</span><span className="stat-value severity-high">Significant (9%)</span></div>
          <div className="recommendations">
            <h3>Recommended Actions</h3>
            <div className="recommendation-item"><i className="fas fa-spray-can" /><span>Apply organic pesticide to affected areas within 3-5 days</span></div>
            <div className="recommendation-item"><i className="fas fa-tint" /><span>Adjust irrigation schedule to reduce excess moisture</span></div>
            <div className="recommendation-item"><i className="fas fa-cut" /><span>Remove severely damaged plants to prevent spread</span></div>
            <div className="recommendation-item"><i className="fas fa-clipboard-check" /><span>Monitor field conditions daily for the next week</span></div>
          </div>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={onSave}>Save Report</button>
            <button className="btn btn-secondary" onClick={onNew}>New Analysis</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function Notification({ message, show }) {
  return (
    <div className={`notification ${show ? 'show' : ''}`}>{message}</div>
  );
}

export default function DisasterDashboard() {
  useFontAwesome();
  const [active, setActive] = useState(null); // null | 'what' | 'how' | 'tool'
  const [uploadState, setUploadState] = useState('idle'); // idle | analyzing | done
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing AI models...');
  const [notification, setNotification] = useState({ show: false, message: '' });

  const startAnalysis = () => {
    setUploadState('analyzing');
    setProgress(0);
    setStatus('Initializing AI models...');
    const messages = [
      'Initializing AI models...',
      'Processing images...',
      'Detecting crop damage...',
      'Analyzing severity levels...',
      'Generating report...'
    ];
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setProgress(p);
      if (p < 100) {
        setStatus(messages[p / 20 - 1]);
      } else {
        clearInterval(interval);
        setTimeout(() => setUploadState('done'), 500);
      }
    }, 800);
  };

  const onFilesSelected = (files) => {
    if (files && files.length > 0) startAnalysis();
  };

  const onSaveReport = () => {
    setNotification({ show: true, message: 'Report saved successfully!' });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const onNewAnalysis = () => {
    setUploadState('idle');
    setProgress(0);
  };

  const goHome = () => {
    setActive(null);
    setUploadState('idle');
    setProgress(0);
  };

  return (
    <div>
      <AnimatedBackground />
      <Header />

      <main className="container">
        {!active && (
          <HomeModules onOpen={(section) => setActive(section)} />
        )}

        <WhatIsSection active={active === 'what'} onBack={goHome} />
        <HowToSection active={active === 'how'} onBack={goHome} />

        <section id="the-tool" className={`section ${active === 'tool' ? 'active' : ''}`}>
          <button className="back-btn" onClick={goHome}>
            <i className="fas fa-arrow-left" /> Back to Home
          </button>
          <h2 className="section-title">
            <i className="fas fa-tools" />
            Try the Disaster Detection Tool
          </h2>
          <p>Upload images of your crops to receive an instant AI-powered damage assessment report.</p>

          {uploadState === 'idle' && <UploadArea onFilesSelected={onFilesSelected} />}
          {uploadState === 'analyzing' && <ProgressAnalysis progress={progress} status={status} />}
          {uploadState === 'done' && <ResultsView onSave={onSaveReport} onNew={onNewAnalysis} />}
        </section>
      </main>

      <Notification message={notification.message} show={notification.show} />
    </div>
  );
}

export { DisasterDashboard };
