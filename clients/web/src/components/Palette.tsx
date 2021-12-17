import { FC, useState } from "react";
import { config } from "../config/config";
import { PaletteColor } from "./PaletteColor";

export const Palette: FC = () => {
	const [selectedColorIndex, setSelectedColorIndex] = useState(
		Number(localStorage.getItem("colorIndex") ?? 0)
	);

	return (
		<div id="palette-container">
			<div id="palette">
				{config.colors.map((_color, index) => (
					<PaletteColor
						key={index}
						colorIndex={index}
						selected={index === selectedColorIndex}
						setSelectedColorIndex={setSelectedColorIndex}
					/>
				))}
			</div>
		</div>
	);
};
