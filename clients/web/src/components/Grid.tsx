import clamp from "just-clamp";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { getGrid, updatePixel } from "../api/grid";
import { socket } from "../clients/socket";
import { config } from "../config/config";
import { arrayBufferToImageData } from "../helpers/arrayBufferToImageData";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";
import { usePanzoom } from "../hooks/usePanzoom";

const { height, width } = config.grid;

interface PutPixelArgs {
	x: number;
	y: number;
	color: number;
}

export const Grid: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement>();
	const [imageData, setImageData] = useState<ImageData>();
	const { x, y, scale } = usePanzoom(canvasElement);
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const [mouseDownCoordinates, setMouseDownCoordinates] = useState({
		x: 0,
		y: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(
		() => setCanvasElement(canvasRef.current ?? undefined),
		[canvasRef]
	);

	useEffect(() => {
		fetchGrid();
	}, []);

	useEffect(
		() => setContext(canvasElement?.getContext("2d") ?? undefined),
		[canvasElement]
	);

	useEffect(() => {
		socket.on("pixel", putPixel);
		return () => {
			socket.off("pixel", putPixel);
		};
	}, [context, x, y]);

	useEffect(() => updateFavicon(), [x, y]);

	useEffect(() => applyImageData(), [context, imageData]);

	const fetchGrid = async () => {
		const arrayBuffer = await getGrid();
		const data = arrayBufferToImageData(arrayBuffer);
		setImageData(data);
	};

	const applyImageData = () => {
		if (!imageData) return;
		context?.putImageData(imageData, 0, 0);
		setIsLoading(false);
		updateFavicon();
	};

	const putPixel = ({ x, y, color }: PutPixelArgs) => {
		if (!context) return;

		context.fillStyle = colorIndexToCssString(color);
		context.fillRect(x, y, 1, 1);
		updateFavicon();
	};

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

	return (
		<>
			<canvas
				ref={canvasRef}
				height={height}
				width={width}
				style={{
					imageRendering: "pixelated",
					display: isLoading ? "none" : "block",
					cursor: "crosshair",
					boxShadow: `0px 0px ${width / 100}px 0px black`,
				}}
				onPointerDownCapture={handleMouseDown}
				onPointerUpCapture={handleMouseUp}
			/>
			{isLoading && <Loading type="cubes" width={100} height={100} />}
		</>
	);
};
