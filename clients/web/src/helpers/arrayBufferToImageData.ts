import { config } from "../config/config";

export const arrayBufferToImageData = (ArrayBuffer: ArrayBuffer): ImageData => {
	const rgbaArray = [];
	const intArray = new Uint8Array(ArrayBuffer);
	for (let i = 0; i < intArray.byteLength; i++) {
		const int = intArray[i];
		// Unpack 8 bit int into 2 4 bit ints
		const colorA = int >> 4;
		const colorB = int & 15;
		// Convert 4 bit ints into 4 byte rgba values
		rgbaArray.push(...config.colors[colorA], ...config.colors[colorB]);
	}

	const int8ClampedArray = new Uint8ClampedArray(rgbaArray);
	const { height, width } = config.grid;
	const imageData = new ImageData(int8ClampedArray, height, width);
	return imageData;
};
