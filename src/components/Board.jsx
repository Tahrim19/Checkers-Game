import React, { useState } from 'react';
import Pieces from './Pieces'; // Import the Pieces component
import { useNavigate } from 'react-router';

const initializeBoard = () => {
  const newBoard = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      const isBlack = (i + j) % 2 === 0;
      let piece = null;

      // Place pieces on the board
      if (i < 3 && isBlack) {
        piece = { color: 'red' }; // Red pieces for the first three rows
      } else if (i > 4 && isBlack) {
        piece = { color: 'blue' }; // Blue pieces for the last three rows
      }

      row.push({
        color: isBlack ? 'black' : 'white',
        piece: piece
      });
    }
    newBoard.push(row);
  }
  return newBoard;
}


const Board = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(initializeBoard);

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <div className='board-container'>
        <div className="board">
        <Pieces board={board} /> 
      </div>
    </div>
    <button onClick={handleClick} className='back-button'> Back to home page</button>
    </>

  );
};

export default Board;
