import clamp from "just-clamp";
import { FC, useState, createContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";

type _ZoomContext = number;

const { initialValue, min, max, speed } = config.grid.zoom;

export const ZoomContext = createContext<_ZoomContext>(initialValue);

export const ZoomProvider: FC = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [zoom, setZoom] = useState(
		Number(searchParams.get("z") ?? initialValue)
	);

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			const queryParams = Object.fromEntries(searchParams.entries());
			const targetZoom = clamp(min, zoom + event.deltaY * speed, max);
			setZoom(targetZoom);
			setSearchParams({ ...queryParams, z: targetZoom.toFixed(2) });
		};
		window.addEventListener("wheel", handleWheel);
		return () => window.removeEventListener("wheel", handleWheel);
	}, [zoom, min, max, speed, searchParams]);

	return <ZoomContext.Provider value={zoom} children={children} />;
};
