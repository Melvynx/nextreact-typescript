/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import clsx from 'clsx';

// 🦁 Supprime ce commentaire et définit correctement les types pour ce composant
type SquareProps = any;

const Square = (props: SquareProps) => {
  // 🦁 Remplace ça par les props définit en haut
  return (
    <button
      className={clsx('square', {
        'winning-square': false, // 🦁 Remplace ça par la prop isWinningSquare
      })}
    >
      O {/* 🦁 Remplace ça par la prop children */}
    </button>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Square isWinningSquare={true}>X</Square>
      <Square isWinningSquare={false}>X</Square>
      <Square isWinningSquare={true}>O</Square>
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
