import clsx from 'clsx';

type SquareProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
      <h2>TikTacToe</h2>
      <Game />
    </div>
  );
}
