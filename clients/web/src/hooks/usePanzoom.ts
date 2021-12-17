import Panzoom, { PanzoomObject, PanzoomOptions } from "@panzoom/panzoom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config } from "../config/config";
import { convertCoordinates } from "../helpers/convertCoordinates";
import { PanzoomEvent, PanzoomDetail } from "../types/types";

const { width, height } = config.grid;
const DEFAULT_OPTIONS: PanzoomOptions = {
	cursor: "crosshair",
	minScale: 0.25,
	maxScale: 100,
	step: 0.15,
};

export const usePanzoom = (element?: HTMLElement) => {
	const [panzoomDetails, setPanzoomDetails] = useState<PanzoomDetail>();
	const [searchParams, setSearchParams] = useSearchParams();
	const [panzoom, setPanzoom] = useState<PanzoomObject>();

	useEffect(() => {
		const { x: startX, y: startY } = convertCoordinates({
			x: Number(searchParams.get("x") ?? 500),
			y: Number(searchParams.get("y") ?? 500),
		});
		const startScale = Number(searchParams.get("scale") ?? 0.5);
		const options: PanzoomOptions = {
			...DEFAULT_OPTIONS,
			startX,
			startY,
			startScale,
		};
		if (element) setPanzoom(Panzoom(element, options));
	}, [element]);

	useEffect(() => {
		if (!panzoom || !element) return;
		const onChange = (event: PanzoomEvent) => {
			const { x, y, scale } = event.detail;
			const coordinates = convertCoordinates({ x, y });
			setPanzoomDetails({ ...coordinates, scale });
			setSearchParams({
				x: coordinates.x.toFixed(2),
				y: coordinates.y.toFixed(2),
				scale: scale.toFixed(2),
			});
		};
		element.parentElement?.addEventListener("wheel", panzoom.zoomWithWheel);
		element.addEventListener("panzoomchange", onChange as any);
		return () => {
			element.parentElement?.removeEventListener(
				"panzoomchange",
				onChange as any
			);
			element.removeEventListener("wheel", panzoom.zoomWithWheel);
		};
	}, [panzoom, element]);

	return { ...panzoomDetails, panzoom };
};
