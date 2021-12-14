import { config } from "../src/config/config";

const { width, height } = config.grid;

export const chessBoard = () =>
	Array.from({ length: width * height }, (_, i) => {
		return Math.floor(i / width) % 2 === i % 2 ? 0 : 1;
	});
