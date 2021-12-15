// ! height * width must be even

import { getRequiredEnvVariable } from "../helpers/getRequiredEnvVariable";

const environment = getRequiredEnvVariable("ENVIRONMENT");

export const config = {
	environment,
	grid: {
		height: 1000,
		width: 1000,
	},
	redis: {
		host: getRequiredEnvVariable("REDIS_HOST"),
	},
	cors: {
		origin:
			environment === "production"
				? ["https://pixelgrid.xyz", "https://www.pixelgrid.xyz"]
				: "http://localhost:3000",
	},
	fastify: {
		logger: {
			prettyPrint:
				environment === "development"
					? {
							translateTime: "HH:MM:ss Z",
							ignore: "pid,hostname",
					  }
					: false,
		},
	},
};
