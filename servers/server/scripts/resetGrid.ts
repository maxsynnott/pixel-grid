import { redis } from "../src/clients/redis";
import { config } from "../src/config/config";

const { width, height } = config.grid;
const bitField = "0000".repeat(width * height);
redis.set("grid", bitField, (err, res) => {
	if (err) console.error(err);
	redis.disconnect();
});
