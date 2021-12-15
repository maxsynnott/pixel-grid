import Fastify from "fastify";
import cors from "fastify-cors";
import socketIo from "fastify-socket.io";
import { config } from "./config/config";
import { GridController } from "./controllers/GridController";

export const server = Fastify();

const corsOptions = {
	origin:
		config.environment === "production"
			? ["https://pixelgrid.xyz", "https://www.pixelgrid.xyz"]
			: "http://localhost:3000",
};
server.register(cors, corsOptions);
server.register(socketIo, { cors: corsOptions });

server.get("/grid", GridController.get);
server.post("/paint", GridController.paint);

server.ready(() =>
	server.io.on("connection", (socket: any) => {
		console.log("Connected", { id: socket.id });
	})
);

const port = process.env.PORT || 8080;
server.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
