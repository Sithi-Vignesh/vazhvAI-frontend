import StarRating from './StarRating';

const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="review-header">
        <span className="reviewer-name">{review.name}</span>
        <span className="review-date">{review.date}</span>
      </div>
      <StarRating rating={review.stars} />
      <p className="review-text">{review.text}</p>
    </div>
  );
};

export default ReviewItem;