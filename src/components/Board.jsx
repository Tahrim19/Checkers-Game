import React from 'react';

const Board = () => {
  const renderBoard = () => {
    const checkersBoard = [];
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const isBlack = (i + j) % 2 === 0;
        row.push(
          <div
            key={j}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: isBlack ? 'black' : 'white',
              display: 'inline-block',
            }}
          ></div>
        );
      }
      checkersBoard.push(
        <div key={i} style={{ display: 'flex' }}>
          {row}
        </div>
      );
    }
    return checkersBoard;
  };

  return (
    <div className='board-div'>
      <div className="board-container">{renderBoard()}</div>
    </div>
  );
};

export default Board;
