import { ReactNode } from "react";
import styles from "./ChatBubble.module.css";

interface ChatBubbleProps {
  message: string;
  isFromYou: boolean;
  isDifferentFromPreviousSender: boolean;
  username: string;
}

/**
 * Renders a chat bubble component for displaying a message in a chat application.
 *
 * Depending on the sender, the chat bubble will be styled differently.
 * If the message is from a different sender than the previous message
 * and the sender is not the current user, the sender's username is
 * displayed above the message.
 *
 * @param {ChatBubbleProps} props - The props for the component.
 * @param {string} props.message - The chat message text to display.
 * @param {boolean} props.isFromYou - Whether the message is from the current user.
 * @param {boolean} props.isDifferentFromPreviousSender - Whether the sender is different from the previous message.
 * @param {string} props.username - The username of the sender.
 * @returns {ReactNode} The rendered chat bubble component.
 */
const ChatBubble = ({
  message,
  isFromYou,
  isDifferentFromPreviousSender,
  username
}: ChatBubbleProps): ReactNode => {
  return (
    <div className={styles.messageContainer}>
      {!isFromYou && isDifferentFromPreviousSender && (
        <div>
          <p className={styles.username}>{username}</p>
        </div>
      )}
      <div className="h-fit">
        <p
          className={`${styles.chatBubble} ${
            isFromYou ? styles.sent : styles.received
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatBubble;
