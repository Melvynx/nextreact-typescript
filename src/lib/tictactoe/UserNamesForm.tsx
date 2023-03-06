import { FormEvent, useRef } from 'react';
import { NonNullableUserNames } from './helpers';

type UserNameFormProps = {
  onUserNamesSubmitted: (userNames: NonNullableUserNames) => void;
};

export const UserNameForm = ({ onUserNamesSubmitted }: UserNameFormProps) => {
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
