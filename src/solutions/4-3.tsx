import {
  createContext,
  FormEvent,
  PropsWithChildren,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import { Board } from '../lib/tictactoe/Board';
import { GameInfo } from '../lib/tictactoe/GameInfo';
import {
  calculateNextValue,
  calculateStatus,
  calculateWinner,
  getDefaultSquares,
  SquareValue,
  UserNames,
} from '../lib/tictactoe/helpers';

type UseUserNamesFormReturnType = {
  userXRef: RefObject<HTMLInputElement>;
  userORef: RefObject<HTMLInputElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const useUserNamesForm = (): UseUserNamesFormReturnType => {
  const { setUserNames } = useGame();

  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;
    if (!userX || !userO) {
      return;
    }

    setUserNames({ X: userX, O: userO });
  };

  return {
    userXRef,
    userORef,
    onSubmit,
  };
};

const UserNameForm = () => {
  const { userXRef, userORef, onSubmit } = useUserNamesForm();

  return (
    <form onClick={onSubmit} className="vertical-stack">
      <h3>Put players usernames</h3>
      <label htmlFor="user1">User X</label>
      <input id="user1" ref={userXRef} required minLength={2} />
      <label htmlFor="user2">User O</label>
      <input id="user2" ref={userORef} required minLength={2} />
      <button type="submit">Submit</button>
    </form>
  );
};

type UseGameReturnType = {
  squares: SquareValue[];
  xUserName: string | null;
  oUserName: string | null;
  status: string;
  setUserNames: (userNames: UserNames) => void;
  onSquareClick: (index: number) => void;
  winningSquares?: number[];
};

const GameContext = createContext<UseGameReturnType | null>(null);

const GameProvider = ({ children }: PropsWithChildren) => {
  const [squares, setSquares] = useState<SquareValue[]>(() => getDefaultSquares());
  const [userNames, setUserNames] = useState<UserNames>({
    X: 'Player X',
    O: 'Player O',
  });

  const nextValue = calculateNextValue(squares);

  const xUserName = userNames.X;
  const oUserName = userNames.O;

  const { winner, winningSquares } = calculateWinner(squares);

  const status = calculateStatus(
    squares,
    `${userNames[nextValue]}'s turn (${nextValue})`,
    winner ? userNames[winner] : winner
  );

  const onSquareClick = (index: number) => {
    if (squares[index] && index > squares.length - 1) {
      return;
    }

    if (winner) {
      return;
    }

    setSquares((prevSquares) => {
      const newSquares = [...prevSquares];
      newSquares[index] = nextValue;
      return newSquares;
    });
  };

  const values: UseGameReturnType = {
    squares,
    xUserName,
    oUserName,
    status,
    setUserNames,
    onSquareClick,
    winningSquares,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

const useGame = (): UseGameReturnType => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

const Game = () => {
  const { squares, xUserName, oUserName, status, onSquareClick, winningSquares } =
    useGame();

  if (!xUserName || !oUserName) {
    return <UserNameForm />;
  }

  return (
    <div className="game">
      <GameInfo
        status={status}
        userNames={{
          X: xUserName,
          O: oUserName,
        }}
      />
      <Board
        onClick={onSquareClick}
        squares={squares}
        winningSquares={winningSquares}
      />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <div>
        <h2>TicTacToe</h2>
        <Game />
      </div>
    </GameProvider>
  );
}
