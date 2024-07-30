import { useState } from "react";
import "./styles.css";

export default function App() {
  const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [isXnext, setIsXnext] = useState(true);
  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXnext ? "X" : "O";
    setIsXnext(!isXnext);
    setBoard(newBoard);
    checkWinner(newBoard);
  };
  const checkWinner = (board) => {
    for (let combo of winningPosition) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };
  const resetHandler = () => {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setWinner(null);
    setIsXnext(true);
  };
  return (
    <div className="App">
      <div className="board">
        {board.map((value, index) => (
          <button
            className="square"
            key={index}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Next player: ${isXnext ? "X" : "O"}`}
      </div>
      <button onClick={resetHandler}>Reset the Game</button>
    </div>
  );
}
