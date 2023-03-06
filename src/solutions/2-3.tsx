import { FormEvent, useRef, useState } from 'react';
import { Board } from '../lib/tictactoe/Board';
import { calculateNextValue, calculateStatus } from '../lib/tictactoe/helpers';

type UserNameFormProps = {
  onUserNamesSubmitted: (userNames: { X: string; O: string }) => void; // TODO correction : montré la magie du rename
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
    <form onClick={onSubmit}>
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
  userNames: UserNames;
};

const GameInfo = ({ status, userNames }: GameInfoProps) => {
  return (
    <div className="game-info">
      <div className="flex gap-3 center">
        <span>
          <b>X</b>:{userNames.X}
        </span>
        <span>VS</span>
        <span>
          <b>O</b>:{userNames.O}
        </span>
      </div>
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
  const status = calculateStatus(squares, nextValue);

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
      <GameInfo status={status} userNames={userNames} />
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
