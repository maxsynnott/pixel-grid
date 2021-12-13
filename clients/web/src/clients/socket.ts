import { io } from "socket.io-client";

export const socket = io("http://localhost:8080");

// socket.on("connect", () => {
// 	console.log("Connected", { id: socket.id });
// });
