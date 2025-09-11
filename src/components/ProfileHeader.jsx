const ProfileHeader = ({ isSeller, toggleRole }) => {
  return (
    <div className="profile-header">
      <div className="profile-image-container">
        <img 
          src="https://images.unsplash.com/photo-1564466809058-b5a9c85aaf2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhcm1lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
          alt="Farmer Profile" 
          className="profile-image" 
        />
        <div className="user-type" onClick={toggleRole}>
          <i className={isSeller ? "fas fa-store" : "fas fa-shopping-cart"}></i>
        </div>
      </div>
      
      <div className="profile-info">
        <h1 className="profile-name">John Farmer</h1>
        <div className="profile-location">
          <i className="fas fa-map-marker-alt"></i>
          <span>Green Valley, CA</span>
        </div>
        <div className="trust-score">
          <i className="fas fa-star"></i>
          <span>4.8/5</span>
        </div>
        <p className="about-text">
          Organic farmer specializing in heirloom tomatoes and seasonal vegetables.
        </p>
      </div>
      
      <div className="role-badge" style={{ color: isSeller ? '#2E7D32' : '#FF5722' }}>
        <i className={isSeller ? "fas fa-store" : "fas fa-shopping-cart"}></i>
        <span>{isSeller ? 'Seller' : 'Buyer'}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;