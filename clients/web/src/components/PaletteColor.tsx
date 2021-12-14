import { FC } from "react";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";

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

	return (
		<div
			style={{
				height: 30,
				width: 30,
				backgroundColor: colorIndexToCssString(colorIndex),
				borderWidth: isSelected ? 3 : 0,
				borderColor: "orange",
				borderStyle: "solid",
				cursor: "pointer",
			}}
			onClick={() => setSelected(colorIndex)}
		></div>
	);
};
