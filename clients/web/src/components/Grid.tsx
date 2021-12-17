import clamp from "just-clamp";
import {
	FC,
	MouseEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
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
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	useEffect(() => {
		setContext(canvasRef?.current?.getContext("2d") ?? undefined);
	}, [canvasRef]);

	const [mouseDownCoordinates, setMouseDownCoordinates] = useState({
		x: 0,
		y: 0,
	});
	const [isRendering, setIsRendering] = useState(true);

	const { x, y, scale } = usePanzoom(canvasRef?.current ?? undefined);
	const { setFaviconImageData } = useFavicon();

	const updateFavicon = useCallback(() => {
		if (!context) return;

		const snapshotX = clamp(0, Math.round(x ?? 0) - 8, config.grid.width - 16);
		const snapshotY = clamp(0, Math.round(y ?? 0) - 8, config.grid.width - 16);
		const imageData = context.getImageData(snapshotX, snapshotY, 16, 16);
		setFaviconImageData(imageData);
	}, [context, x, y]);

	const putPixel = useCallback(
		({ x, y, color }: PutPixelArgs) => {
			if (!context) return;

			context.fillStyle = colorIndexToCssString(color);
			context.fillRect(x, y, 1, 1);
			updateFavicon();
		},
		[context, x, y, updateFavicon]
	);

	useEffect(() => {
		if (!context) return;
		context.putImageData(imageData, 0, 0);
		setIsRendering(false);
		updateFavicon();
	}, [context]);

	useEffect(() => {
		socket.on("pixel", putPixel);
		return () => {
			socket.off("pixel", putPixel);
		};
	}, [putPixel]);

	useEffect(() => updateFavicon(), [x, y]);

	const handleMouseDown = ({ clientX, clientY }: MouseEvent) =>
		setMouseDownCoordinates({ x: clientX, y: clientY });

	const handleMouseUp = (event: MouseEvent) => {
		const rect = canvasRef?.current?.getBoundingClientRect();
		if (!rect || scale === undefined) return;

		const dragDistance =
			Math.abs(mouseDownCoordinates.x - event.clientX) +
			Math.abs(mouseDownCoordinates.y - event.clientY);
		if (dragDistance > 10) return;

		const pixelX = Math.floor((event.clientX - rect.left) / scale);
		const pixelY = Math.floor((event.clientY - rect.top) / scale);
		const color = Number(localStorage.getItem("colorIndex"));
		const payload = { x: pixelX, y: pixelY, color };
		putPixel(payload);
		updatePixel(payload);
	};

	return (
		<canvas
			ref={canvasRef}
			height={height}
			width={width}
			style={{ display: isRendering ? "none" : "block" }}
			id="grid"
			onPointerDownCapture={handleMouseDown}
			onPointerUpCapture={handleMouseUp}
		/>
	);
};
