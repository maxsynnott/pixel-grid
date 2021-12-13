import { redis } from "../src/clients/redis";
import { config } from "../src/config/config";

const bitField = "0".repeat(4 * Math.pow(config.grid.size, 2));
redis.set("grid", bitField, (err, res) => {
	if (err) console.error(err);
	redis.disconnect();
});
