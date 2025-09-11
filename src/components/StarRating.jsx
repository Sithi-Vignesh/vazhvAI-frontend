const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fas fa-star"></i>);
  }
  
  if (hasHalfStar) {
    stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
  }
  
  return <div className="stars">{stars}</div>;
};

export default StarRating;