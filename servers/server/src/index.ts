import Fastify from "fastify";
import { redis } from "./clients/redis";
import { config } from "./config/config";
import { numberTo4BitString } from "./helpers/numberTo4BitString";

const app = Fastify();

app.get("/grid", async (_request, reply) => {
	const response = await redis.get("grid");
	reply.send(response);
});

interface PostPaintBody {
	x: number;
	y: number;
	color: number;
}

app.post<{ Body: PostPaintBody }>("/paint", async (request, reply) => {
	const { x, y, color } = request.body;

	const offset = (y * config.grid.size + x) * 4;
	const value = numberTo4BitString(color);
	await redis.setrange("grid", offset, value);
	reply.status(204).send();
});

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
