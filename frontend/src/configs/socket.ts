import { io } from "socket.io-client";

const url = import.meta.env.VITE_BH_URL || "http://localhost";
const port = import.meta.env.VITE_BH_PORT || 5000;

const socket = io(`${url}:${port}`);

export default socket;