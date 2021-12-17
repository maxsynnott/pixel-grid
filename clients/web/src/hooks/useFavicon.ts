import { useEffect, useState } from "react";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 16;
canvas.height = 16;

export const useFavicon = () => {
	const [imageData, setImageData] = useState<ImageData>();

	useEffect(() => {
		if (!imageData) return;
		context?.putImageData(imageData, 0, 0);
		const href = canvas.toDataURL();
		const faviconLink = document.getElementById(
			"favicon-link"
		) as HTMLLinkElement;
		faviconLink.href = href;
	}, [imageData]);

	return { setFaviconImageData: setImageData };
};
