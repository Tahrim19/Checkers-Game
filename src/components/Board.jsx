import React, { useState } from 'react';
import Pieces from './Pieces';
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
};


const calculateValidMoves = (board, rowIndex, cellIndex, playerColor) => {
  const moves = [];
  const piece = board[rowIndex][cellIndex].piece;
  const directions = piece.isKing ? [1, -1] : [playerColor === 'red' ? 1 : -1];
  const opponentColor = playerColor === 'red' ? 'blue' : 'red';

  directions.forEach(direction => {
    // Normal moves
    if (rowIndex + direction >= 0 && rowIndex + direction < 8) {
      if (cellIndex - 1 >= 0 && !board[rowIndex + direction][cellIndex - 1].piece) {
        moves.push({ row: rowIndex + direction, col: cellIndex - 1 });
      }
      if (cellIndex + 1 < 8 && !board[rowIndex + direction][cellIndex + 1].piece) {
        moves.push({ row: rowIndex + direction, col: cellIndex + 1 });
      }
    }

    // Capturing moves
    if (rowIndex + 2 * direction >= 0 && rowIndex + 2 * direction < 8) {
      if (cellIndex - 2 >= 0 && board[rowIndex + direction][cellIndex - 1].piece?.color === opponentColor && !board[rowIndex + 2 * direction][cellIndex - 2].piece) {
        moves.push({ row: rowIndex + 2 * direction, col: cellIndex - 2, capture: { row: rowIndex + direction, col: cellIndex - 1 } });
      }
      if (cellIndex + 2 < 8 && board[rowIndex + direction][cellIndex + 1].piece?.color === opponentColor && !board[rowIndex + 2 * direction][cellIndex + 2].piece) {
        moves.push({ row: rowIndex + 2 * direction, col: cellIndex + 2, capture: { row: rowIndex + direction, col: cellIndex + 1 } });
      }
    }
  });

  return moves;
};

const checkWinCondition = (board) => {
  const redPieces = board.flat().filter(cell => cell.piece && cell.piece.color === 'red').length;
  const bluePieces = board.flat().filter(cell => cell.piece && cell.piece.color === 'blue').length;

  if (redPieces === 0) return 'blue';
  if (bluePieces === 0) return 'red';

  const redHasMoves = board.some((row, rowIndex) =>
    row.some((cell, cellIndex) =>
      cell.piece?.color === 'red' && calculateValidMoves(board, rowIndex, cellIndex, 'red').length > 0
    )
  );

  const blueHasMoves = board.some((row, rowIndex) =>
    row.some((cell, cellIndex) =>
      cell.piece?.color === 'blue' && calculateValidMoves(board, rowIndex, cellIndex, 'blue').length > 0
    )
  );

  if (!redHasMoves) return 'blue';
  if (!blueHasMoves) return 'red';

  return null;
};

const Board = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(initializeBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [score, setScore] = useState({ red: 0, blue: 0 }); // Initialize score state

  const updateScore = (playerColor) => {
    setScore(prevScore => ({
      ...prevScore,
      [playerColor]: prevScore[playerColor] + 1
    }));
  };

  const handlePieceClick = (rowIndex, cellIndex) => {
    const clickedPiece = board[rowIndex][cellIndex].piece;

    if (clickedPiece && clickedPiece.color === currentPlayer) {
      setSelectedPiece({ row: rowIndex, col: cellIndex });
      const moves = calculateValidMoves(board, rowIndex, cellIndex, currentPlayer);
      setValidMoves(moves);
    } else if (selectedPiece) {
      const move = validMoves.find(
        move => move.row === rowIndex && move.col === cellIndex
      );

      if (move) {
        const newBoard = [...board];
        newBoard[rowIndex][cellIndex].piece = newBoard[selectedPiece.row][selectedPiece.col].piece;
        newBoard[selectedPiece.row][selectedPiece.col].piece = null;

        // If this was a capturing move, remove the opponent's piece
        if (move.capture) {
          newBoard[move.capture.row][move.capture.col].piece = null;
          updateScore(currentPlayer);  // Update the score for the current player
        }

        // Check for King promotion
        if ((currentPlayer === 'red' && rowIndex === 7) || (currentPlayer === 'blue' && rowIndex === 0)) {
          newBoard[rowIndex][cellIndex].piece.isKing = true;  // Promote to King
        }

        setBoard(newBoard);
        setSelectedPiece(null);
        setValidMoves([]);

        // Switch turns
        setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');

        // Check for win condition
        const winner = checkWinCondition(newBoard);
        if (winner) {
          alert(`${winner} wins!`);
        }
      }
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
    <div className='board-container'>
      <div className='header-container'>
        <div className='score-board'>
          <div>Red: {score.red}</div>
          <div>Blue: {score.blue}</div>
        </div>
        <button onClick={handleClick} className='back-button'>Back to home page</button>
      </div>
      <p className='turn-container'>{currentPlayer.toUpperCase()} TURN </p>
      <div className="board">
        <Pieces board={board} onPieceClick={handlePieceClick} validMoves={validMoves}/> 
      </div>
    </div>
    </>
  );
};

export default Board;
