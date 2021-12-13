import { FC, useEffect, useRef, useState } from "react";
import { getGrid } from "../api/grid";
import { config } from "../config/config";
import { bitStringToImageData } from "../helpers/bitStringToImageData";

export const Grid: FC = () => {
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

	const { height, width } = config.grid;
	return <canvas ref={canvasRef} height={height} width={width}></canvas>;
};
