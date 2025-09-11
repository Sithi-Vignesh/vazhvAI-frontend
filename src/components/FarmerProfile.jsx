import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ContactSection from './ContactSection';
import ProductsSection from './ProductsSection';
import ReviewsSection from './ReviewsSection';
import ActionButtons from './ActionButtons';
import './FarmerProfile.css';

const FarmerProfile = () => {
  const [isSeller, setIsSeller] = useState(true);
  
  const toggleRole = () => {
    setIsSeller(!isSeller);
  };
  
  return (
    <div className="profile-card">
      <ProfileHeader isSeller={isSeller} toggleRole={toggleRole} />
      <ContactSection />
      <ProductsSection />
      <ReviewsSection />
      <ActionButtons />
    </div>
  );
};

export default FarmerProfile;