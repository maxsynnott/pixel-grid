import { config } from "../src/config/config";

export const fullColor = (color: number) => {
	const { width, height } = config.grid;
	return Array(width * height).fill(color);
};
