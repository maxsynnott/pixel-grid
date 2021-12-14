import Fastify from "fastify";
import cors from "fastify-cors";
import socketIo from "fastify-socket.io";
import { GridController } from "./controllers/GridController";

export const server = Fastify();

const corsOptions = {};
server.register(cors, corsOptions);
server.register(socketIo, { cors: corsOptions });

server.get("/grid", GridController.get);
server.post("/paint", GridController.paint);

server.ready(() =>
	server.io.on("connection", (socket) => {
		console.log("Connected", { id: socket.id });
	})
);

const port = process.env.PORT || 8080;
server.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
