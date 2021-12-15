import { redis } from "./clients/redis";
import { config } from "./config/config";

const GRID_KEY = "grid";
const PIXEL_COUNT = config.grid.width * config.grid.height;

export const handler = async ({ color }: any) => {
	const pattern = Array(PIXEL_COUNT).fill(color);

	const applyStartTime = Date.now();
	await Promise.all(
		pattern.map((color, i) =>
			redis.bitfield(GRID_KEY, ["SET", "u4", `#${i}`, color])
		)
	);
	return `Painted in ${Date.now() - applyStartTime} milliseconds`;
};
