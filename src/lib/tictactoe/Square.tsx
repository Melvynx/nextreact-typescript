import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type SquareProps = ComponentPropsWithoutRef<'button'> & {
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
