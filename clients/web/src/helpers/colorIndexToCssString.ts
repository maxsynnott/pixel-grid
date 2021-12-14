import { config } from "../config/config";

export const colorIndexToCssString = (colorIndex: number): string =>
	`rgba(${config.colors[colorIndex].join(",")})`;
