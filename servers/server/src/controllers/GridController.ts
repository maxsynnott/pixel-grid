import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "..";
import { config } from "../config/config";
import { GridService } from "../services/GridService";
import { PatchGridBody } from "../types/types";

export class GridController {
	static get = async (request: FastifyRequest, reply: FastifyReply) => {
		const response = await GridService.getBuffer();
		reply.send(response);
	};

	static update = async (
		request: FastifyRequest<{ Body: PatchGridBody }>,
		reply: FastifyReply
	) => {
		const { x, y, color } = request.body;
		// TODO: Replace with proper validation
		if (x >= config.grid.width || y >= config.grid.height || color >= 16)
			throw new Error();

		await GridService.updatePixel(x, y, color);

		server.io.emit("pixel", { x, y, color });
		reply.status(204).send();
	};
}
