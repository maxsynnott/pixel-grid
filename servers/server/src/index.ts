import Fastify from "fastify";
import { redis } from "./clients/redis";

const app = Fastify();

app.get("/grid", async (_request, reply) => {
	const response = await redis.get("grid");
	reply.send(response);
});

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
