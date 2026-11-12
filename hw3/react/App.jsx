import { useState } from 'react';

/**
 * Renders a single square on the Tic-Tac-Toe board.
 * Conditionally applies a highlight class if the square is part of a winning line.
 */
function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className={"square" + (isWinningSquare ? " winning" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

/**
 * Renders the 3x3 game board and calculates the game status.
 * Intercepts square clicks to enforce game rules before passing data up.
 */
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {

    // Prevent updates if the game is already won or the square is filled
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // Pass both the updated board state and the index of the move back to Game
    onPlay(nextSquares, i);
  }

  const { winner, line } = calculateWinner(squares);
  
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {

    // If there is no winner and no empty squares remain, the game is a draw
    status = 'Result: Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const boardSize = 3;
  const boardRows = [];

  // Dynamically construct the 3x3 grid using nested loops
  for (let row = 0; row < boardSize; row++) {
    const boardSquares = [];
    
    for (let col = 0; col < boardSize; col++) {
      const squareIndex = row * boardSize + col;
      
      boardSquares.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          isWinningSquare={line.includes(squareIndex)}
        />
      );
    }
    
    boardRows.push(
      <div key={row} className="board-row">
        {boardSquares}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

/**
 * The top-level component that manages the game's time-travel history.
 * Tracks the sequence of boards, the current move, and the sorting preference.
 */
export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null }
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, i) {

    // Convert the 1D array index into a 2D (row, col) coordinate for the history log
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: `(${row}, ${col})` }
    ];
    
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    let description;
    
    if (move > 0) {
      description = `Go to move #${move} ${step.location}`;
    } else {
      description = 'Go to game start';
    }

    // Render the active move as plain text rather than a clickable button
    if (move === currentMove) {
      return (
        <li key={move}>
          <b>You are at move #{move} {step.location ? step.location : ''}</b>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button 
          onClick={() => setIsAscending(!isAscending)}
          style={{ marginBottom: '10px' }}
        >
          Sort: {isAscending ? 'Descending' : 'Ascending'}
        </button>

        {/* Visually reverse the ordered list numbers if sorting descending */}
        <ol reversed={!isAscending}>
          {isAscending ? moves : [...moves].reverse()}
        </ol>
      </div>
    </div>
  );
}

/**
 * Checks all 8 possible winning combinations on a 3x3 board.
 * Returns an object containing the winning player and the array of winning indices.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  
  return { winner: null, line: [] };
}