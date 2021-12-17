import Panzoom, { PanzoomObject, PanzoomOptions } from "@panzoom/panzoom";
import { useEffect, useState } from "react";
import { config } from "../config/config";
import { PanzoomEvent, PanzoomDetail } from "../types/types";

const OPTIONS: PanzoomOptions = {
	cursor: "crosshair",
	startScale: 0.5,
	minScale: 0.25,
	maxScale: 100,
	step: 0.15,
};

const { width, height } = config.grid;

export const usePanzoom = (element?: HTMLElement) => {
	const [panzoomDetails, setPanzoomDetails] = useState<PanzoomDetail>();
	const [panzoom, setPanzoom] = useState<PanzoomObject>();

	useEffect(() => {
		if (element) setPanzoom(Panzoom(element, OPTIONS));
	}, [element]);

	useEffect(() => {
		if (!panzoom || !element) return;
		const onChange = (event: PanzoomEvent) => {
			const { x, y, scale } = event.detail;
			setPanzoomDetails({ x: width / 2 - x, y: height / 2 - y, scale });
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
