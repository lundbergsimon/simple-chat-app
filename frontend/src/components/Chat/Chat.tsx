import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import MessageList from "../MessageList/MessageList";
import socket from "../../configs/socket";
import Message from "../../types/Message";

interface ChatProps {
  username: string;
}

/**
 * A component that renders a chat window. It listens to messages from the server
 * and updates the list of messages. It also sends messages to the server when the
 * user submits the form.
 *
 * @param {string} username The username of the user.
 * @returns {ReactNode} The Chat component.
 */
const Chat = ({ username }: ChatProps): ReactNode => {
  // Use state to store the list of messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Use state to store the input field
  const [input, setInput] = useState<string>("");

  // Use inputRef to focus the input field after submitting the form
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    /**
     * Handles receiving messages from the server.
     *
     * Adds the received message to the current list of messages.
     *
     * @param {Message} message - The message object received from the server.
     */
    const handleReceiveMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleReceiveMessage);

    return () => {
      socket.off("message", handleReceiveMessage);
    };
  });

  const isEmptyString = (str: string) => str.trim() === "";
  const focusInput = () => inputRef.current?.focus();

  /**
   * Handles submitting the form in the chat window.
   *
   * Prevents the default form submission behavior. If the input field is empty,
   * does nothing. Otherwise, sends the message to the server with the
   * corresponding user and socket ID, and clears the input field.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The event object.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent sending empty messages
    if (isEmptyString(input)) return;

    // Send the message
    socket.emit("message", {
      text: input,
      username: username,
      socketId: socket.id,
      timestamp: new Date().getTime()
    });

    // Reset the input field
    setInput("");

    // Focus the input field to start typing immediately
    focusInput();
  };

  return (
    <>
      <h1 className={styles.userHeader}>{username}</h1>
      <div className={styles.chatWindow}>
        <MessageList messages={messages} socketId={socket.id!} />
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className={styles.messageInput}
              autoFocus
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
