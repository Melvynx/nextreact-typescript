import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';
import { calculateNextValue, calculateStatus } from '../lib/tictactoe/helpers';

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
  null,
  null,
  null,
  null,
  null,
  'O',
  null,
  'X',
  null,
];

const Game = () => {
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
