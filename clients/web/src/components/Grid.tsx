import clamp from "just-clamp";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { getGrid, updatePixel } from "../api/grid";
import { socket } from "../clients/socket";
import { config } from "../config/config";
import { arrayBufferToImageData } from "../helpers/arrayBufferToImageData";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";
import { usePanzoom } from "../hooks/usePanzoom";

interface PutPixelArgs {
	x: number;
	y: number;
	color: number;
}

export const Grid: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement>();
	useEffect(
		() => setCanvasElement(canvasRef.current ?? undefined),
		[canvasRef]
	);
	const { x, y, scale } = usePanzoom(canvasElement);
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const [mouseDownCoordinates, setMouseDownCoordinates] = useState({
		x: 0,
		y: 0,
	});

	useEffect(
		() => setContext(canvasElement?.getContext("2d") ?? undefined),
		[canvasElement]
	);

	const fetchGrid = async () => {
		const arrayBuffer = await getGrid();
		const imageData = arrayBufferToImageData(arrayBuffer);
		context?.putImageData(imageData, 0, 0);
		updateFavicon();
	};

	useEffect(() => {
		if (!context) return;
		fetchGrid();
	}, [context]);

	const putPixel = ({ x, y, color }: PutPixelArgs) => {
		if (!context) return;

		context.fillStyle = colorIndexToCssString(color);
		context.fillRect(x, y, 1, 1);
		updateFavicon();
	};

	useEffect(() => {
		socket.on("pixel", putPixel);
		return () => {
			socket.off("pixel", putPixel);
		};
	}, [context, x, y]);

	const updateFavicon = () => {
		const snapshotCanvas = document.createElement("canvas");
		const snapshotContext = snapshotCanvas.getContext("2d");
		if (!snapshotContext || !context) return;
		const snapshotX = clamp(0, Math.round(x ?? 0) - 8, config.grid.width - 16);
		const snapshotY = clamp(0, Math.round(y ?? 0) - 8, config.grid.width - 16);
		snapshotCanvas.width = 16;
		snapshotCanvas.height = 16;
		const imageData = context.getImageData(snapshotX, snapshotY, 16, 16);
		snapshotContext.putImageData(imageData, 0, 0);
		const href = snapshotCanvas.toDataURL("image/png");
		const faviconLink = document.getElementById(
			"favicon-link"
		) as HTMLLinkElement;
		if (faviconLink) faviconLink.href = href;
	};

	useEffect(() => updateFavicon(), [x, y]);

	const handleMouseDown = ({ clientX, clientY }: MouseEvent) =>
		setMouseDownCoordinates({ x: clientX, y: clientY });

	const handleMouseUp = (event: MouseEvent) => {
		const movement =
			Math.abs(mouseDownCoordinates.x - event.clientX) +
			Math.abs(mouseDownCoordinates.y - event.clientY);
		if (movement > 10) return;

		const rect = canvasElement?.getBoundingClientRect();
		if (!rect || scale === undefined) return;
		const pixelX = Math.floor((event.clientX - rect.left) / scale);
		const pixelY = Math.floor((event.clientY - rect.top) / scale);
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
			onPointerDownCapture={handleMouseDown}
			onPointerUpCapture={handleMouseUp}
		/>
	);
};
