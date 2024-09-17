import React, { useState } from 'react';
import './ReviewCard.css';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewCard = ({ review, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(review.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          src={`https://api.dicebear.com/6.x/personas/svg?seed=${review.author_name}`}
          alt={review.author_name}
          className="profile-picture"
        />
        <div className="review-info">
          <h4>{review.author_name}</h4>
          <div className="rating-date">
            <StarRating rating={review.rating} />
            <span className="date">{new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <p className={`review-text ${isExpanded ? 'expanded' : ''}`}>
        {review.text}
      </p>

      {/* Uncomment to enable 'Read more' button
      {review.text.length > 100 && (
        <button
          className="read-more-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
      */}

      {review.reply && (
        <div className="reply">
          <p>{review.reply}</p>
          <span className="date">{new Date(review.reply_date).toLocaleDateString()}</span>
        </div>
      )}

      {!review.reply && !isReplying && (
        <button className="reply-btn" onClick={() => setIsReplying(true)}>
          Reply
        </button>
      )}

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="reply-form">
          <textarea
            value={replyText}
            onChange={handleReplyChange}
            placeholder="Write your reply..."
            rows="3"
          />
          <div className="actions">
            <button type="button" className="cancel" onClick={() => setIsReplying(false)}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewCard;
