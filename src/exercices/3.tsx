import { FormEvent, useRef, useState } from 'react';
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

// 🦁 Créer un hooks `useUserNamesForm` et déplace toute la logique de notre
// composant `UserNameForm` dans ce hooks.

const UserNameForm = ({ onUserNamesSubmitted }: UserNameFormProps) => {
  // 🦁 Déplace la logique de ce composant dans le hooks `useUserNamesForm`
  const userXRef = useRef<HTMLInputElement>(null);
  const userORef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userX = userXRef.current?.value;
    const userO = userORef.current?.value;
    if (!userX || !userO) {
      return;
    }

    onUserNamesSubmitted({ X: userX, O: userO });
  };

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

const Game = () => {
  const [squares] = useState<SquareValue[]>(() => getDefaultSquares());
  const [userNames, setUserNames] = useState<UserNames>({
    X: 'Player X',
    O: 'Player O',
  });

  const nextValue = calculateNextValue(squares);

  const xUserName = userNames.X;
  const oUserName = userNames.O;

  if (!xUserName || !oUserName) {
    return (
      <UserNameForm
        onUserNamesSubmitted={(userNames) => {
          setUserNames(userNames);
        }}
      />
    );
  }

  const status = calculateStatus(
    squares,
    `${userNames[nextValue]}'s turn (${nextValue})`
  );

  return (
    <div className="game">
      <GameInfo
        status={status}
        userNames={{
          X: xUserName,
          O: oUserName,
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
