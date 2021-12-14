import { config } from "../config/config";

export const getOffset = (x: number, y: number) => y * config.grid.width + x;
