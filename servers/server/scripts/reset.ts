import { redis } from "../src/clients/redis";
import { config } from "../src/config/config";
import { GRID_KEY } from "../src/services/GridService";

const TARGET_COLOR = 3;

const { width, height } = config.grid;

const setAllTo = async (color: number) => {
	const numOfTiles = width * height;
	const notifyEveryNTiles = (width * height) / 10;
	for (let i = 0; i < numOfTiles; i++) {
		if (i % notifyEveryNTiles === 0) console.log((i / numOfTiles) * 100 + "%");
		await redis.bitfield(GRID_KEY, ["SET", "u4", `#${i}`, color]);
	}
	console.log("100%\nDone");
};

const reset = async () => {
	await redis.del("grid");
	console.log("Cleared grid");
	console.log("Setting all tiles to color " + TARGET_COLOR);
	await setAllTo(TARGET_COLOR);
};

reset().then(() => redis.disconnect());
