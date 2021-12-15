import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import cors from "fastify-cors";
import socketIo from "fastify-socket.io";
import { config } from "./config/config";
import { GridController } from "./controllers/GridController";
import { HealthcheckController } from "./controllers/HealthcheckController";

export const server = Fastify();

server.register(cors, config.cors);
server.register(socketIo, { cors: config.cors });

server.get("/healthcheck", HealthcheckController.healthcheck);
server.get("/grid", GridController.get);
server.post("/paint", GridController.paint);

server.ready().then(() =>
	server.io.on("connection", (socket: any) => {
		console.log("Connected", { id: socket.id });
	})
);

const port = process.env.PORT || 8080;
server.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
