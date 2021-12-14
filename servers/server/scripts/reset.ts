import { redis } from "../src/clients/redis";
import { config } from "../src/config/config";
import { GRID_KEY } from "../src/services/GridService";

const { width, height } = config.grid;

const reset = async () => {
	await redis.del("grid");
	for (let i = 0; i < width * height; i++) {
		await redis.bitfield(GRID_KEY, ["SET", "u4", `#${i}`, 0]);
	}
};

reset().then(() => redis.disconnect());
