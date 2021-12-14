import clamp from "just-clamp";
import { FC, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { ZoomContext } from "../contexts/ZoomContext";

const BASE_INCREMENT = 100;
const { width, height } = config.grid;

export const Pan: FC = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [x, setX] = useState(Number(searchParams.get("x") ?? width / 2));
	const [y, setY] = useState(Number(searchParams.get("y") ?? height / 2));

	const zoom = useContext(ZoomContext);

	const handleKeyDown = ({ key }: KeyboardEvent) => {
		let newX = x;
		let newY = y;

		const increment = BASE_INCREMENT / zoom;
		if (key === "ArrowUp") newY -= increment;
		if (key === "ArrowRight") newX += increment;
		if (key === "ArrowDown") newY += increment;
		if (key === "ArrowLeft") newX -= increment;

		newX = clamp(0, newX, width);
		newY = clamp(0, newY, height);
		setX(newX);
		setY(newY);
		const queryParams = Object.fromEntries(searchParams.entries());
		setSearchParams({
			...queryParams,
			x: newX.toFixed(2),
			y: newY.toFixed(2),
		});
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [x, y, searchParams]);

	const transform = `translate(${width / 2 - x}px, ${height / 2 - y}px)`;
	return <div style={{ transform }}>{children}</div>;
};
