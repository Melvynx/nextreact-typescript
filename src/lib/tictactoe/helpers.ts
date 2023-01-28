export type SquareValue = 'X' | 'O' | null;

export const calculateNextValue = (squares: SquareValue[]) => {
  const xSquaresCount = squares.filter((r) => r === 'X').length;
  const oSquaresCount = squares.filter((r) => r === 'O').length;
  return oSquaresCount === xSquaresCount ? 'X' : 'O';
};

export const calculateStatus = (
  squares: SquareValue[],
  nextPlayer: string,
  winner?: string | null
) => {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextPlayer}`;
};

export const getDefaultSquares = (): SquareValue[] => new Array(9).fill(null);

export type UserNames = {
  X: string | null;
  O: string | null;
};

export type NonNullableUserNames = DeepNonNullable<UserNames>;

export type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export const calculateWinner = (squares: SquareValue[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningSquares: line,
      };
    }
  }
  return {
    winner: null,
    winningSquares: [],
  };
};
