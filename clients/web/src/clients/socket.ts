import { io } from "socket.io-client";
import { config } from "../config/config";

export const socket = io(config.api.baseUrl);
