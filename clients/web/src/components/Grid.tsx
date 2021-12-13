import clamp from "just-clamp";
import { FC, useEffect, useRef, useState } from "react";
import { getGrid } from "../api/grid";
import { config } from "../config/config";
import { bitStringToImageData } from "../helpers/bitStringToImageData";

const MIN_ZOOM = 1;
const MAX_ZOOM = 100;
const ZOOM_SPEED = 0.01;

export const Grid: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imageData, setImageData] = useState<ImageData>();
	const [zoom, setZoom] = useState(4);

	const fetchGrid = async () => {
		const bitString = await getGrid();
		const newImageData = bitStringToImageData(bitString);
		setImageData(newImageData);
	};

	useEffect(() => {
		fetchGrid();
	}, []);

	useEffect(() => {
		if (!canvasRef.current || !imageData) return;

		const context = canvasRef.current.getContext("2d");
		context?.putImageData(imageData, 0, 0);
	}, [canvasRef, imageData]);

	const { height, width } = config.grid;
	return (
		<div
			style={{ transform: `scale(${zoom})` }}
			onWheel={(e) => {
				const targetZoom = zoom + e.deltaY * ZOOM_SPEED;
				setZoom(clamp(MIN_ZOOM, targetZoom, MAX_ZOOM));
			}}
		>
			<canvas
				ref={canvasRef}
				height={height}
				width={width}
				style={{ imageRendering: "pixelated" }}
			></canvas>
		</div>
	);
};
