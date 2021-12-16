import clamp from "just-clamp";
import { FC, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { CameraContext } from "../contexts/CameraContext";

const { width, height } = config.grid;

export const Pan: FC = ({ children }) => {
	const { x, y } = useContext(CameraContext);

	const transform = `translate(${width / 2 - x}px, ${height / 2 - y}px)`;
	return <div style={{ transform }}>{children}</div>;
};
