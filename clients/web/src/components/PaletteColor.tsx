import { FC } from "react";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";

interface Props {
	colorIndex: number;
	selected: boolean;
	setSelectedColorIndex: (colorIndex: number) => void;
}

export const PaletteColor: FC<Props> = ({
	colorIndex,
	selected,
	setSelectedColorIndex,
}) => {
	const handleClick = () => {
		setSelectedColorIndex(colorIndex);
		localStorage.setItem("colorIndex", colorIndex.toString());
	};

	return (
		<div
			style={{
				height: 30,
				width: 30,
				backgroundColor: colorIndexToCssString(colorIndex),
				borderWidth: selected ? 3 : 0,
				borderColor: "orange",
				borderStyle: "solid",
				cursor: "pointer",
			}}
			onClick={handleClick}
		></div>
	);
};
