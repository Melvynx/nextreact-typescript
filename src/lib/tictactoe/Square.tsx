import clsx from 'clsx';

type SquareProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isWinningSquare?: boolean;
};

export const Square = ({ children, isWinningSquare, ...props }: SquareProps) => {
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
