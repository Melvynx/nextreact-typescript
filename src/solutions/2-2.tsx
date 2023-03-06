import { FormEvent, useRef, useState } from 'react';
import { Board } from '../lib/tictactoe/Board';
import { calculateNextValue, calculateStatus } from '../lib/tictactoe/helpers';

type UserNameFormProps = {
  onUserNamesSubmitted: (userNames: { X: string; O: string }) => void;
};

const UserNameForm = ({ onUserNamesSubmitted }: UserNameFormProps) => {
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

type GameInfoProps = {
  status: string;
};

const GameInfo = ({ status }: GameInfoProps) => {
  return (
    <div className="game-info">
      <div>{status}</div>
      <ol>{/* TODO */}</ol>
    </div>
  );
};

const getDefaultSquares = () => new Array(9).fill(null);

type UserNames = {
  X: string | null;
  O: string | null;
};

const Game = () => {
  const [squares] = useState(getDefaultSquares());
  const [userNames, setUserNames] = useState<UserNames>({ X: null, O: null });

  const nextValue = calculateNextValue(squares);

  if (!userNames.X || !userNames.O) {
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
