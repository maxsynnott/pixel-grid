import { redis } from "../src/clients/redis";

const bitField = "0".repeat(4 * 10 * 10);
redis.set("grid", bitField, (err, res) => {
	if (err) console.error(err);
	redis.disconnect();
});
