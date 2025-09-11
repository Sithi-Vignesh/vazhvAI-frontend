const ContactSection = () => {
  return (
    <div className="profile-section">
      <h2 className="section-title">
        <i className="fas fa-address-card"></i>
        Contact
      </h2>
      <div className="contact-details">
        <a href="tel:+15551234567" className="contact-item">
          <i className="fas fa-phone"></i>
        </a>
        <a href="mailto:john@greenvalleyfarms.com" className="contact-item">
          <i className="fas fa-envelope"></i>
        </a>
        <a href="https://maps.google.com" className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
        </a>
        <a href="https://wa.me/15551234567" className="contact-item">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactSection;