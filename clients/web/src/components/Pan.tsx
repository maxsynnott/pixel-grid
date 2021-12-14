import { FC, useContext, useEffect, useState } from "react";
import { ZoomContext } from "../contexts/ZoomContext";

const BASE_INCREMENT = 100;

export const Pan: FC = ({ children }) => {
	const zoom = useContext(ZoomContext);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	const increment = BASE_INCREMENT / zoom;
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowUp":
					setY(y + increment);
					break;
				case "ArrowRight":
					setX(x - increment);
					break;
				case "ArrowDown":
					setY(y - increment);
					break;
				case "ArrowLeft":
					setX(x + increment);
					break;
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [x, y, increment]);

	return (
		<div style={{ transform: `translate(${x}px, ${y}px)` }}>{children}</div>
	);
};
