import Fastify from "fastify";
import { redis } from "./clients/redis";
import { config } from "./config/config";
import { numberTo4BitString } from "./helpers/numberTo4BitString";
import cors from "fastify-cors";
import { PostPaintBody } from "./types/types";
import socketIo from "fastify-socket.io";

const server = Fastify();

const corsOptions = {};
server.register(cors, corsOptions);
server.register(socketIo, { cors: corsOptions });

server.get("/grid", async (_request, reply) => {
	const response = await redis.get("grid");
	reply.header("Content-Type", "application/octet-stream").send(response);
});

server.post<{ Body: PostPaintBody }>("/paint", async (request, reply) => {
	const { x, y, color } = request.body;
	if (x >= config.grid.width || y >= config.grid.height || color >= 16)
		throw new Error();

	const offset = (y * config.grid.width + x) * 4;
	const value = numberTo4BitString(color);
	await redis.setrange("grid", offset, value);
	server.io.emit("paint", { x, y, color });
	reply.status(204).send();
});

server.ready(() =>
	server.io.on("connection", (socket) => {
		console.log("Connected", { id: socket.id });
	})
);

const port = process.env.PORT || 8080;
server.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
