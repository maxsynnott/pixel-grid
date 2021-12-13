import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { getGrid, paint } from "../api/grid";
import { config } from "../config/config";
import { ZoomContext } from "../contexts/ZoomContext";
import { bitStringToImageData } from "../helpers/bitStringToImageData";

export const Grid: FC = () => {
	const zoom = useContext(ZoomContext);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imageData, setImageData] = useState<ImageData>();

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

	const handleClick = (event: MouseEvent) => {
		if (!canvasRef?.current) return;
		const rect = canvasRef.current.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / zoom);
		const y = Math.floor((event.clientY - rect.top) / zoom);
		const color = Math.floor(Math.random() * 16);
		paint(x, y, color);
	};

	const { height, width } = config.grid;
	return (
		<canvas
			ref={canvasRef}
			height={height}
			width={width}
			style={{ imageRendering: "pixelated", display: "block" }}
			onClick={handleClick}
		/>
	);
};
