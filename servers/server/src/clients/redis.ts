import Redis from "ioredis";

export const redis = new Redis().on("error", (error) => console.error(error));
