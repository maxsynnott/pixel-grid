import { getRequiredEnvVariable } from "../helpers/getRequiredEnvVariable";

export const config = {
	grid: {
		height: 1000,
		width: 1000,
	},
	redis: {
		host: getRequiredEnvVariable("REDIS_HOST"),
	},
};
