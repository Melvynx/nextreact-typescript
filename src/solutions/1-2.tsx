import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type SquareProps = ComponentPropsWithoutRef<'button'> & {
  isWinningSquare?: boolean;
};

const Square = ({ children, isWinningSquare, ...props }: SquareProps) => {
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

type SquareValue = 'X' | 'O' | null;

type BoardProps = {
  squares: SquareValue[];
  winningSquares?: number[];
  onClick?: (index: number) => void;
};

const Board = ({ squares, onClick, winningSquares }: BoardProps) => {
  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <Square
          onClick={() => onClick?.(index)}
          isWinningSquare={winningSquares?.includes(index)}
          key={index}
        >
          {square}
        </Square>
      ))}
    </div>
  );
};

const getDefaultSquares = (): SquareValue[] => [
  // TODO correction : montré la différence avec `as`
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
