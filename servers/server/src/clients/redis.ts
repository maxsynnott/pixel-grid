import Redis from "ioredis";
import { config } from "../config/config";

export const redis = new Redis({ host: config.redis.host }).on(
	"error",
	(error) => console.error(error)
);
