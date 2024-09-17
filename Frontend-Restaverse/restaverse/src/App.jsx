import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './styles.css';
import "./App.css";
import ReviewList from './components/ReviewList';
import Pagination from './components/Pagination';


const App = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews(currentPage);
    }
  }, [currentPage, isAuthenticated]);

  const fetchReviews = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/reviews?page=${page}&per_page=10`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data.reviews);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (reviewId, replyText) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reply: replyText }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedReview = await response.json();

      // Update reviews state with the new reply
      setReviews(reviews.map(review => 
        review.id === updatedReview.id ? updatedReview : review
      ));
    } catch (error) {
      console.error('Error replying to review:', error);
    }
  };

  return (
    <div className="app-container">
      {/* <h1>Customer Reviews</h1> */}
      {isAuthenticated ? (
        <>
          <div className="user-section">
            <p className="welcome-text">Welcome, {user.name}!</p>
            <div className='logout-btn-container'>
              <button className='logout-btn' onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            </div>
          </div>
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <>
              <ReviewList reviews={reviews} onReply={handleReply} />
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </>
          )}
        </>
      ) : (
        <div className='login-page'>
          <h1>Welcome To Review Hub 🚀</h1>
          <p>One step solution to managing your reviews</p>
                  <button onClick={() => loginWithRedirect()} className=''>Login</button>

        </div>
      )}
    </div>
  );
};

export default App;
