import { useState } from "react";

// useUsername hook return type
type UseUsernameReturnType = {
  username: string;
  signIn: (username: string) => void;
};

/**
 * A hook that provides a username state and a function to set the username.
 * The provided function is intended to be called when the user signs in.
 * @returns {UseUsernameReturnType}
 */
const useUsername = (): UseUsernameReturnType => {
  // Use state to store the username
  const [username, setUsername] = useState<string>("");

  /**
   * Sets the username state to the provided `username` string.
   * This is intended to be called when the user signs in.
   * @param {string} username - The username to be displayed.
   */
  const signIn = (username: string) => {
    setUsername(username);
  };

  return { username, signIn };
};

export default useUsername;
