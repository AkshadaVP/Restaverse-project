import React, { useState } from 'react';

function Review({ review, onReply }) {
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onReply(review.id, replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="review">
      <div className="review-header">
        <img src={review.profile_picture || '/default-avatar.png'} alt={review.author_name} className="profile-picture" />
        <h3>{review.author_name}</h3>
        <div className="rating">{Array(review.rating).fill('★').join('')}</div>
      </div>
      <p className="review-text">{review.text}</p>
      <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
      
      {review.reply && (
        <div className="reply">
          <h4>Reply:</h4>
          <p>{review.reply}</p>
          <p className="reply-date">{new Date(review.reply_date).toLocaleDateString()}</p>
        </div>
      )}

      {!review.reply && !isReplying && (
        <button onClick={() => setIsReplying(true)}>Reply</button>
      )}

      {isReplying && (
        <form onSubmit={handleSubmitReply} className="reply-form">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            required
          />
          <button type="submit">Submit Reply</button>
        </form>
      )}
    </div>
  );
}

export default Review;