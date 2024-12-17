import { ReactNode } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import SignIn from "./components/SignIn/SignIn";
import useUsername from "./hooks/useUsername";

/**
 * A component that renders either a sign-in form or a chat window
 * based on the user's sign-in status.
 *
 * Utilizes the `useUsername` hook to manage the username state.
 * If the user is not signed in, the `SignIn` component is rendered.
 * Once the user signs in, the `Chat` component is displayed.
 *
 * @returns {ReactNode} The appropriate component based on sign-in status.
 */
function App(): ReactNode {
  const { username, signIn } = useUsername();

  return (
    <>{!username ? <SignIn signIn={signIn} /> : <Chat username={username} />}</>
  );
}

export default App;
