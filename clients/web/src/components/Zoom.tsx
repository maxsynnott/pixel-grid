import clamp from "just-clamp";
import { FC, useState } from "react";

interface Props {
	min: number;
	max: number;
	speed: number;
}

export const Zoom: FC<Props> = ({ min, max, speed, children }) => {
	const [zoom, setZoom] = useState(4);

	return (
		<div
			style={{ transform: `scale(${zoom})` }}
			onWheel={(e) => {
				e.preventDefault();
				const targetZoom = zoom + e.deltaY * speed;
				setZoom(clamp(min, targetZoom, max));
			}}
		>
			{children}
		</div>
	);
};
