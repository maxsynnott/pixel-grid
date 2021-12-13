import { FC, useEffect, useState } from "react";

const INCREMENT = 15;

export const Pan: FC = ({ children }) => {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowUp":
					setY(y + INCREMENT);
					break;
				case "ArrowRight":
					setX(x - INCREMENT);
					break;
				case "ArrowDown":
					setY(y - INCREMENT);
					break;
				case "ArrowLeft":
					setX(x + INCREMENT);
					break;
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [x, y]);

	return (
		<div style={{ transform: `translate(${x}px, ${y}px)` }}>{children}</div>
	);
};
