import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type SquareProps = {
  isWinningSquare?: boolean;
} & ComponentPropsWithoutRef<'button'>;

const Square = ({ isWinningSquare, children, ...props }: SquareProps) => {
  return (
    <button
      className={clsx('square', {
        'winning-square': isWinningSquare,
      })}
      {...props}
    >
      {children}
    </button>
  );
};

type SquareValue = 'O' | 'X' | null;

type BoardProps = {
  squares: SquareValue[];
  winningSquares?: number[];
  onClick?: (index: number) => void;
};

const Board = ({ squares, onClick, winningSquares }: BoardProps) => {
  return (
    <div className="game-board">
      {squares.map((square, i) => (
        <Square
          onClick={() => onClick?.(i)}
          key={`square-${i}`}
          isWinningSquare={winningSquares?.includes(i)}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};

const getDefaultSquares = (): SquareValue[] => [
  null,
  null,
  null,
  null,
  null,
  null,
  'O',
  null,
  'X',
];

const Game = () => {
  const squares = getDefaultSquares();
  return (
    <div className="game">
      <Board squares={squares} winningSquares={[0, 1, 2]} />
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
