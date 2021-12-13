import { config } from "../config/config";

export const bitStringToImageData = (bitString: string): ImageData => {
	const rgbaArray = [];

	for (let i = 0; i < bitString.length; i += 4) {
		const bits = bitString.substr(i, 4);
		const colorIndex = parseInt(bits, 2);
		const rgbaColor = config.colors[colorIndex];
		rgbaArray.push(...rgbaColor);
	}

	const dataArray = new Uint8ClampedArray(rgbaArray);
	const { height, width } = config.grid;
	const imageData = new ImageData(dataArray, height, width);
	return imageData;
};
