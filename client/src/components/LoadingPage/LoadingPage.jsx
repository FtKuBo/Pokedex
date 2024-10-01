import React from 'react';
import './LoadingPage.css'; 

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Loading, please wait...</h2>
    </div>
  );
};

export default LoadingPage;