import { ReactNode, useEffect, useState } from "react";
import styles from "./SignIn.module.css";

interface SignInProps {
  signIn: (username: string) => void;
}

/**
 * Renders a sign-in form with an input field and a confirm button.
 *
 * When the user submits the form, the `signIn` callback is called with the
 * username as its argument.
 *
 * The form also has a character limit of 10 characters. If the user enters a
 * username longer than 10 characters, a warning message is displayed.
 *
 * @param {SignInProps} props - The props for the component.
 * @param {function} props.signIn - Callback function to be called when the form is submitted.
 * @returns {ReactNode} - The rendered sign-in form component.
 */
function SignIn({ signIn }: SignInProps): ReactNode {
  const CHARACTER_LIMIT = 10;

  // Use state to store the username
  const [username, setUsername] = useState<string>("");

  // Use state to store username too long warning
  const [usernameTooLong, setUsernameTooLong] = useState<boolean>(false);

  /**
   * Handles the sign-in form submission event.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The event object.
   * @returns {Promise<void>}
   */
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Prevent submitting empty or too long username
    if (username.trim() === "" || usernameTooLong) return;

    // Call the signIn callback with username
    signIn(username);
  };

  /**
   * Handles changes to the username input field.
   *
   * Updates the `username` state with the new value and checks if the username
   * exceeds the character limit. If it does, sets the `usernameTooLong` state
   * to true; otherwise, sets it to false.
   *
   * @param {string} username - The new username entered by the user.
   */
  const onChange = (username: string) => {
    setUsername(username);
  };

  // Check if username is too long
  useEffect(() => {
    const isTooLong = username.length > CHARACTER_LIMIT;
    setUsernameTooLong(isTooLong);
  }, [username]);

  return (
    <div className="h-fit mt-2">
      <form onSubmit={onSubmit} className="flex gap-2" id="sign-in-form">
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Username..."
          className={styles.usernameInput}
          autoFocus
          autoComplete="off"
        />
        <button type="submit">Confirm</button>
      </form>
      {usernameTooLong && (
        <p className={styles.warning} data-testid="username-too-long">
          Max 10 characters
        </p>
      )}
    </div>
  );
}

export default SignIn;
