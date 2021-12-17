import Panzoom, { PanzoomObject, PanzoomOptions } from "@panzoom/panzoom";
import { useEffect, useState } from "react";
import { convertCoordinates } from "../helpers/convertCoordinates";
import { PanzoomEvent, PanzoomDetail } from "../types/types";

const DEFAULT_OPTIONS: PanzoomOptions = {
	cursor: "crosshair",
	minScale: 0.25,
	maxScale: 100,
	step: 0.15,
};

const initialQueryParams = new URLSearchParams(document.location.search);

export const usePanzoom = (element?: HTMLElement) => {
	const [panzoomDetails, setPanzoomDetails] = useState<PanzoomDetail>();
	const [panzoom, setPanzoom] = useState<PanzoomObject>();

	useEffect(() => {
		const { x: startX, y: startY } = convertCoordinates({
			x: Number(initialQueryParams.get("x") ?? 500),
			y: Number(initialQueryParams.get("y") ?? 500),
		});
		const startScale = Number(initialQueryParams.get("scale") ?? 0.5);
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
			const updatedParams = new URLSearchParams(
				Object.entries({
					x: coordinates.x.toFixed(2),
					y: coordinates.y.toFixed(2),
					scale: scale.toFixed(2),
				})
			);
			history.replaceState({}, "", `?${updatedParams.toString()}`);
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
