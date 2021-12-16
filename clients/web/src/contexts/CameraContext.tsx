import clamp from "just-clamp";
import { FC, useState, createContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";

type _CameraContext = { x: number; y: number; zoom: number };

const {
	width,
	height,
	zoom: { initialValue, min, max, speed },
	pan: { baseIncrement },
} = config.grid;

export const CameraContext = createContext<_CameraContext>({
	x: width / 2,
	y: height / 2,
	zoom: initialValue,
});

export const CameraProvider: FC = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [x, setX] = useState(Number(searchParams.get("x") ?? width / 2));
	const [y, setY] = useState(Number(searchParams.get("y") ?? height / 2));
	const [zoom, setZoom] = useState(
		Number(searchParams.get("zoom") ?? initialValue)
	);

	useEffect(() => {
		setSearchParams({
			x: x.toFixed(2),
			y: y.toFixed(2),
			zoom: zoom.toFixed(2),
		});
	}, [x, y, zoom]);

	const handleKeyDown = ({ key }: KeyboardEvent) => {
		const increment = baseIncrement / zoom;
		if (key === "ArrowUp") setY(clamp(0, y - increment, height));
		if (key === "ArrowRight") setX(clamp(0, x + increment, width));
		if (key === "ArrowDown") setY(clamp(0, y + increment, height));
		if (key === "ArrowLeft") setX(clamp(0, x - increment, width));
	};

	const handleWheel = (event: WheelEvent) => {
		const targetZoom = clamp(min, zoom + event.deltaY * speed, max);
		setZoom(targetZoom);
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [x, y, searchParams]);

	useEffect(() => {
		window.addEventListener("wheel", handleWheel);
		return () => window.removeEventListener("wheel", handleWheel);
	}, [zoom, min, max, speed, searchParams]);

	return <CameraContext.Provider value={{ x, y, zoom }} children={children} />;
};
