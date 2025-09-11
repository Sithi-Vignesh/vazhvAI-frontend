import ReviewItem from './ReviewItem';

const ReviewsSection = () => {
  const reviews = [
    { 
      name: 'Sarah M.', 
      date: 'May 15, 2023', 
      stars: 5, 
      text: 'The tomatoes were absolutely delicious! So fresh and flavorful.' 
    },
    { 
      name: 'Mike R.', 
      date: 'April 28, 2023', 
      stars: 4.5, 
      text: 'Great quality produce. The carrots were especially sweet!' 
    }
  ];
  
  return (
    <div className="profile-section">
      <h2 className="section-title">
        <i className="fas fa-star"></i>
        Reviews
        <span className="section-badge">4.8</span>
      </h2>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;