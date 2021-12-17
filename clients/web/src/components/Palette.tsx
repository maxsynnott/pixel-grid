import { FC, useState } from "react";
import { config } from "../config/config";
import { PaletteColor } from "./PaletteColor";

export const Palette: FC = () => {
	const [selectedColorIndex, setSelectedColorIndex] = useState(
		Number(localStorage.getItem("colorIndex") ?? 0)
	);

	return (
		<div
			style={{
				position: "absolute",
				bottom: 15,
				left: 15,
			}}
		>
			<div
				style={{
					display: "grid",
					backgroundColor: "orange",
					gridTemplateRows: "min-content min-content min-content min-content",
					gridTemplateColumns:
						"min-content min-content min-content min-content",
					border: "1px solid #000000",
					borderBottom: "none",
					borderRadius: 2,
					alignItems: "center",
					justifyItems: "center",
					padding: 2,
				}}
			>
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
