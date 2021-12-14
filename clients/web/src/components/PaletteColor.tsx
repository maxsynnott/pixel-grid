import { FC } from "react";
import { config } from "../config/config";

interface Props {
	colorIndex: number;
	selected: number;
	setSelected: (color: number) => void;
}

export const PaletteColor: FC<Props> = ({
	colorIndex,
	selected,
	setSelected,
}) => {
	const isSelected = colorIndex === selected;
	const color = config.colors[colorIndex];
	const rgbaString = `rgba(${color.join(",")})`;

	return (
		<div
			style={{
				height: 30,
				width: 30,
				backgroundColor: rgbaString,
			}}
			onClick={() => setSelected(colorIndex)}
		></div>
	);
};
