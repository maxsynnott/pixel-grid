import { chessBoard } from "../patterns/chessBoard";
import { doublingColors } from "../patterns/doublingColors";
import { fullColor } from "../patterns/fullColor";
import { redis } from "../src/clients/redis";
import { GRID_KEY } from "../src/services/GridService";

type PatternType = "chessBoard" | "doublingColors" | "fullColor";

const getPattern = (pattern: PatternType, arg?: any) => {
	switch (pattern) {
		case "chessBoard":
			return chessBoard();
		case "doublingColors":
			return doublingColors();
		case "fullColor":
			return fullColor(arg);
	}
};

const setGrid = async (pattern: number[]) =>
	Promise.all(
		pattern.map((color, i) =>
			redis.bitfield(GRID_KEY, ["SET", "u4", `#${i}`, color])
		)
	);

const setPattern = async (patternType: PatternType, arg?: any) => {
	await redis.del("grid");
	console.log("Grid cleared");

	const generateStartTime = Date.now();
	const pattern = getPattern(patternType, arg);
	console.log(
		`Pattern generated in ${Date.now() - generateStartTime} milliseconds`
	);

	const applyStartTime = Date.now();
	await setGrid(pattern);
	console.log(`Pattern applied in ${Date.now() - applyStartTime} milliseconds`);
};

// Implement CLI
setPattern("fullColor", 7).then(() => redis.disconnect());
