import { redis } from "../src/clients/redis";
import { config } from "../src/config/config";

const { width, height } = config.grid;
const bitField = "0".repeat(4 * width * height);
redis.set("grid", bitField, (err, res) => {
	if (err) console.error(err);
	redis.disconnect();
});
