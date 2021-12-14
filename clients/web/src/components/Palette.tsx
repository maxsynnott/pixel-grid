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
				bottom: 0,
				width: "100%",
				justifyContent: "center",
				display: "flex",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					backgroundColor: "lightgray",
					padding: 5,
					border: "1px solid #000000",
					borderBottom: "none",
					borderRadius: 2,
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
