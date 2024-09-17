import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import './reviewlist.css';
import { BsGrid3X2GapFill } from "react-icons/bs";
import { HiViewList } from "react-icons/hi";

const ReviewList = ({ reviews, onReply }) => {
  const [view, setView] = useState('card');

  return (
    <div className="review-list-container">
      <div className='toggle-viewer'>
        {view === 'list' ? (
          <button
            onClick={() => setView('card')}
            className={view === 'card' ? 'active' : ''}
          >
            <BsGrid3X2GapFill size={24} />
          </button>
        ) : (
          <button
            onClick={() => setView('list')}
            className={view === 'list' ? 'active' : ''}
          >
            <HiViewList size={24} />
          </button>
        )}
      </div>

      <div className={`review-list ${view}-view`}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} onReply={onReply} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;