import { redis } from "../clients/redis";
import { getOffset } from "../helpers/getOffset";

export const GRID_KEY = "grid";

export class GridService {
	static getBuffer = async () => {
		return redis.getBuffer(GRID_KEY);
	};

	static paintPixel = async (x: number, y: number, color: number) => {
		const offset = getOffset(x, y);
		await redis.bitfield(GRID_KEY, ["set", "u4", `#${offset}`, color]);
	};
}
