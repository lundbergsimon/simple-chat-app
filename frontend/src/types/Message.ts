interface Message {
  text: string;
  username: string;
  socketId: string;
  timestamp: number;
}

export default Message;