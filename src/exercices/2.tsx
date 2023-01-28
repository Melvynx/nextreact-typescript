import { Board } from '../lib/tictactoe/Board';
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
} from '../lib/tictactoe/helpers';

type GameInfoProps = {
  status: string;
};

const GameInfo = ({ status }: GameInfoProps) => {
  return (
    <div className="game-info">
      <div>{status}</div>
    </div>
  );
};

const Game = () => {
  // 🦁 Utilise `useState` pour gérer l'état des cases (attention à l'utiliser correctement) et résout les erreurs TypeScript
  const squares = getDefaultSquares();

  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(squares, nextValue);

  return (
    <div className="game">
      <GameInfo status={status} />
      <Board squares={squares} />
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h2>TicTacToe</h2>
      <Game />
    </div>
  );
}
