import React from 'react';
const Pieces = ({ board }) => {
  return (
    <>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="pieces-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className="pieces-cell"
              style={{ backgroundColor: cell.color }}
            >
              {cell.piece && (
                <div
                  className="piece"
                  style={{ backgroundColor: cell.piece.color }}
                ></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Pieces;
