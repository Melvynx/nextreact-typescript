import { FormEvent, RefObject, useRef, useState } from 'react';
import { Board } from '../lib/tictactoe/Board';
import { GameInfo } from '../lib/tictactoe/GameInfo';
import {
  calculateNextValue,
  calculateStatus,
  getDefaultSquares,
  NonNullableUserNames,
  SquareValue,
  UserNames,
} from '../lib/tictactoe/helpers';

type UserNameFormProps = {
  onUserNamesSubmitted: (userNames: NonNullableUserNames) => void;
};

type UseUserNamesFormReturnType = {
  userXRef: RefObject<HTMLInputElement>;
  userORef: RefObject<HTMLInputElement>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const useUserNamesForm = (
  onUserNamesSubmitted: (userNames: NonNullableUserNames) => void
): UseUserNamesFormReturnType => {
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;

    if (!userX || !userO) {
      return;
    }

    if (userX === userO) {
      alert('Usernames must be different');
      return;
    }

    onUserNamesSubmitted({ X: userX, O: userO });
  };

  return {
    userXRef,
    userORef,
    onSubmit,
  };
};

const UserNameForm = ({ onUserNamesSubmitted }: UserNameFormProps) => {
  const { userXRef, userORef, onSubmit } = useUserNamesForm(onUserNamesSubmitted);

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
  userNames: UserNames;
  status: string;
  setUserNames: (userNames: UserNames) => void;
};

const useGame = (): UseGameReturnType => {
  const [squares] = useState(getDefaultSquares());
  const [userNames, setUserNames] = useState<UserNames>({
    X: 'Player X',
    O: 'Player O',
  });

  const nextValue = calculateNextValue(squares);

  const status = calculateStatus(
    squares,
    `${userNames[nextValue]}'s turn (${nextValue})`
  );

  return {
    squares,
    status,
    setUserNames,
    userNames,
  };
};

const Game = () => {
  const { squares, userNames, status, setUserNames } = useGame();

  if (!userNames.X || !userNames.O) {
    return (
      <UserNameForm
        onUserNamesSubmitted={(userNames) => {
          setUserNames(userNames);
        }}
      />
    );
  }

  return (
    <div className="game">
      <GameInfo
        status={status}
        userNames={{
          X: userNames.X,
          O: userNames.O,
        }}
      />
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
