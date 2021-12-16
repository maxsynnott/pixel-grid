import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { getGrid, updatePixel } from "../api/grid";
import { socket } from "../clients/socket";
import { config } from "../config/config";
import { CameraContext } from "../contexts/CameraContext";
import { arrayBufferToImageData } from "../helpers/arrayBufferToImageData";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";

interface PutPixelArgs {
	x: number;
	y: number;
	color: number;
}

export const Grid: FC = () => {
	const { x, y, zoom } = useContext(CameraContext);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D>();

	useEffect(
		() => setContext(canvasRef?.current?.getContext("2d") ?? undefined),
		[canvasRef]
	);

	const fetchGrid = async () => {
		const arrayBuffer = await getGrid();
		const imageData = arrayBufferToImageData(arrayBuffer);
		context?.putImageData(imageData, 0, 0);
	};

	useEffect(() => {
		if (!context) return;
		fetchGrid();
	}, [context]);

	const putPixel = ({ x, y, color }: PutPixelArgs) => {
		if (!context) return;

		context.fillStyle = colorIndexToCssString(color);
		context.fillRect(x, y, 1, 1);
	};

	useEffect(() => {
		if (!context) return;
		socket.on("pixel", putPixel);
		return () => {
			socket.off("pixel", putPixel);
		};
	}, [context]);

	const handleClick = (event: MouseEvent) => {
		const rect = canvasRef?.current?.getBoundingClientRect();
		if (!rect) return;
		const pixelX = Math.floor((event.clientX - rect.left) / zoom);
		const pixelY = Math.floor((event.clientY - rect.top) / zoom);
		const color = Number(localStorage.getItem("colorIndex"));
		putPixel({ x: pixelX, y: pixelY, color });
		updatePixel(pixelX, pixelY, color);
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
				boxShadow: `0px 0px ${width / 100}px 0px black`,
			}}
			onClick={handleClick}
		/>
	);
};
