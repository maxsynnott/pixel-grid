import Fastify from "fastify";

const app = Fastify();

app.get("/", (request, reply) => {
	reply.send("Hello World!");
});

const port = process.env.PORT || 8080;
app.listen(port, (err) => {
	if (!err) console.log(`Listening on port ${port}`);
});
