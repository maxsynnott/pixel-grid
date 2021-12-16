import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { getGrid, paint } from "../api/grid";
import { socket } from "../clients/socket";
import { config } from "../config/config";
import { CameraContext } from "../contexts/CameraContext";
import { arrayBufferToImageData } from "../helpers/arrayBufferToImageData";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";

interface PaintArgs {
	x: number;
	y: number;
	color: number;
}

export const Grid: FC = () => {
	const { zoom } = useContext(CameraContext);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imageData, setImageData] = useState<ImageData>();

	const fetchGrid = async () => {
		const arrayBuffer = await getGrid();
		const newImageData = arrayBufferToImageData(arrayBuffer);
		setImageData(newImageData);
	};

	useEffect(() => {
		fetchGrid();
	}, []);

	useEffect(() => {
		const context = canvasRef?.current?.getContext("2d");
		if (!context || !imageData) return;
		context.putImageData(imageData, 0, 0);
	}, [canvasRef, imageData]);

	const paintTile = ({ x, y, color }: PaintArgs) => {
		const context = canvasRef?.current?.getContext("2d");
		if (!context) return;
		context.fillStyle = colorIndexToCssString(color);
		context.fillRect(x, y, 1, 1);
	};

	useEffect(() => {
		const context = canvasRef?.current?.getContext("2d");
		if (!context) return;

		socket.on("paint", paintTile);
		return () => {
			socket.off("paint", paintTile);
		};
	}, [canvasRef]);

	const handleClick = (event: MouseEvent) => {
		if (!canvasRef?.current) return;
		const rect = canvasRef.current.getBoundingClientRect();
		const x = Math.floor((event.clientX - rect.left) / zoom);
		const y = Math.floor((event.clientY - rect.top) / zoom);
		const color = Number(localStorage.getItem("colorIndex"));
		paintTile({ x, y, color });
		paint(x, y, color);
	};

	const { height, width } = config.grid;
	return (
		<canvas
			ref={canvasRef}
			height={height}
			width={width}
			style={{
				imageRendering: "pixelated",
				display: "block",
				cursor: "crosshair",
				boxShadow: `0px 0px ${config.grid.width / 100}px 0px black`,
			}}
			onClick={handleClick}
		/>
	);
};
