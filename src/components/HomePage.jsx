import React from 'react';
import { useNavigate } from 'react-router';
import '../css/checkers.css'; // Import the CSS file

const CheckersHeading = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/board'); 
  };

  return (
    <div className="checkers-container">
      <div className="checkers-heading">
        <h1>Checkers</h1>
        <p>Ready to challenge your mind and test your skills?</p>
        <button className="play-button" onClick={handleClick}>Start Playing</button>
      </div>
    </div>
  );
};

export default CheckersHeading;
