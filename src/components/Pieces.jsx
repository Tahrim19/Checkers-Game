import React from 'react';

const Pieces = ({ board, onPieceClick, validMoves }) => {
  const isValidMove = (row, col) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  return (
    <>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="pieces-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`pieces-cell ${isValidMove(rowIndex, cellIndex) ? 'highlight' : ''}`}
              style={{ backgroundColor: cell.color }}
              onClick={() => onPieceClick(rowIndex, cellIndex)}
            >
              {cell.piece && (
                <div
                  className={`piece ${cell.piece.isKing ? 'king' : ''}`}
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
