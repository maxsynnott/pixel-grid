import clamp from "just-clamp";
import { FC, useState, createContext, useEffect } from "react";
import { config } from "../config/config";

type _ZoomContext = number;

const { initialValue, min, max, speed } = config.grid.zoom;

export const ZoomContext = createContext<_ZoomContext>(initialValue);

export const ZoomProvider: FC = ({ children }) => {
	const [zoom, setZoom] = useState(initialValue);

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			const targetZoom = zoom + event.deltaY * speed;
			setZoom(clamp(min, targetZoom, max));
		};
		window.addEventListener("wheel", handleWheel);
		return () => window.removeEventListener("wheel", handleWheel);
	}, [zoom, min, max, speed]);

	return <ZoomContext.Provider value={zoom} children={children} />;
};
