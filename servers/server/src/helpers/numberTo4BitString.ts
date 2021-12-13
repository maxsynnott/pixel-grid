export const numberTo4BitString = (number: number): string =>
	number.toString(2).padStart(4, "0");
