import { useGameLogic } from './hooks/useGameLogic';
import Board from './components/Board';
import './App.css';

function App() {
  const { board, currentPlayer, makeMove } = useGameLogic();

  return (
    <div className="App">
      <h1>Tic-Tac-Flow</h1>
      <h2>Current Player: {currentPlayer}</h2>
      <Board board={board} onCellClick={makeMove} />
    </div>
  );
}

export default App;
