import { FastifyReply, FastifyRequest } from "fastify";

export class HealthcheckController {
	static healthcheck = async (request: FastifyRequest, reply: FastifyReply) => {
		reply.status(200).send({ status: "Healthy" });
	};
}
