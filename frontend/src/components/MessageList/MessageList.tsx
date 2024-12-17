import { memo, useEffect, useRef } from "react";
import Message from "../../types/Message";
import ChatBubble from "../ChatBubble/ChatBubble";
import styles from "./MessageList.module.css";

interface MessageListProps {
  messages: Message[];
  socketId: string;
}

/**
 * A component that renders a list of chat messages.
 *
 * It automatically scrolls to the bottom when new messages are added,
 * ensuring that the user always sees the latest message. Each message
 * is displayed using the `ChatBubble` component, and messages are sorted
 * by timestamp to maintain the correct order. It also determines if the
 * current message is from the user or a different sender, as well as if the
 * previous message was from a different sender for styling purposes.
 *
 * @param {MessageListProps} props - The props for the component.
 * @param {Message[]} props.messages - An array of message objects to display.
 * @param {string} props.socketId - The socket ID of the current user.
 * @returns {ReactNode} The rendered list of messages.
 */
const MessageList = memo(({ messages, socketId }: MessageListProps) => {
  const bottomOfChatRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the chat window when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Scrolls the chat window to the bottom. This is useful for keeping the user's
   * view on the most recent message when new messages are added.
   */
  const scrollToBottom = () => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.messagesContainer}>
      {messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((message, index) => {
          const prevSender = messages[index - 1]?.socketId;
          const currentSender = message.socketId;

          return (
            <ChatBubble
              key={index}
              message={message.text}
              isFromYou={message.socketId === socketId}
              isDifferentFromPreviousSender={currentSender !== prevSender}
              username={message.username}
            />
          );
        })}
      <div className="bottom-of-chat" ref={bottomOfChatRef}></div>
    </div>
  );
});

export default MessageList;
