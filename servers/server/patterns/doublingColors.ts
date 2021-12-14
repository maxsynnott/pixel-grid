import { config } from "../src/config/config";

// TODO: Optimise
export const doublingColors = () => {
	const { width, height } = config.grid;
	const pixelCount = width * height;

	const pattern = [];
	let colorCount = 1;
	for (let i = 0; i < pixelCount; ) {
		for (let color = 0; color < 4; color++) {
			for (let j = 0; j < colorCount; j++) {
				if (i >= pixelCount) break;
				pattern.push(color);
				i++;
			}
		}
		colorCount *= 2;
	}
	return pattern;
};
