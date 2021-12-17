import { config } from "../config/config";
import { Coordinates } from "../types/types";

const { width, height } = config.grid;

export const convertCoordinates = ({ x, y }: Coordinates): Coordinates => ({
	x: width / 2 - x,
	y: height / 2 - y,
});
