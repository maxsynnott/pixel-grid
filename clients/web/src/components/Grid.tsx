import clamp from "just-clamp";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { updatePixel } from "../api/grid";
import { socket } from "../clients/socket";
import { config } from "../config/config";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";
import { useFavicon } from "../hooks/useFavicon";
import { usePanzoom } from "../hooks/usePanzoom";

const { height, width } = config.grid;

interface PutPixelArgs {
	x: number;
	y: number;
	color: number;
}

interface Props {
	imageData: ImageData;
}

export const Grid: FC<Props> = ({ imageData }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement>();
	const { x, y, scale } = usePanzoom(canvasElement);
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const [mouseDownCoordinates, setMouseDownCoordinates] = useState({
		x: 0,
		y: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const { setFaviconImageData } = useFavicon();

	useEffect(
		() => setCanvasElement(canvasRef.current ?? undefined),
		[canvasRef]
	);

	useEffect(
		() => setContext(canvasElement?.getContext("2d") ?? undefined),
		[canvasElement]
	);

	useEffect(() => {
		context?.putImageData(imageData, 0, 0);
		setIsLoading(false);
		updateFavicon();
	}, [context]);

	useEffect(() => {
		socket.on("pixel", putPixel);
		return () => {
			socket.off("pixel", putPixel);
		};
	}, [context, x, y]);

	useEffect(() => updateFavicon(), [x, y]);

	const putPixel = ({ x, y, color }: PutPixelArgs) => {
		if (!context) return;

		context.fillStyle = colorIndexToCssString(color);
		context.fillRect(x, y, 1, 1);
		updateFavicon();
	};

	const updateFavicon = () => {
		if (!context) return;
		const snapshotX = clamp(0, Math.round(x ?? 0) - 8, config.grid.width - 16);
		const snapshotY = clamp(0, Math.round(y ?? 0) - 8, config.grid.width - 16);
		const imageData = context.getImageData(snapshotX, snapshotY, 16, 16);
		setFaviconImageData(imageData);
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
		<canvas
			ref={canvasRef}
			height={height}
			width={width}
			style={{ display: isLoading ? "none" : "block" }}
			id="grid"
			onPointerDownCapture={handleMouseDown}
			onPointerUpCapture={handleMouseUp}
		/>
	);
};
