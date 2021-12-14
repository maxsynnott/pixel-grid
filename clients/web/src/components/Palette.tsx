import { FC } from "react";
import { config } from "../config/config";
import { PaletteColor } from "./PaletteColor";

interface Props {
	selectedColorIndex: number;
	setSelectedColorIndex: (value: number) => void;
}

export const Palette: FC<Props> = ({
	selectedColorIndex,
	setSelectedColorIndex,
}) => {
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
					backgroundColor: "#FFFFFF",
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
						selected={selectedColorIndex}
						setSelected={setSelectedColorIndex}
					/>
				))}
			</div>
		</div>
	);
};
