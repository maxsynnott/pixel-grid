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

	const selectedStyles = {
		margin: 2,
		padding: 4,
		borderRadius: 10,
	};

	return (
		<div
			className="palette-color"
			style={{
				backgroundColor: colorIndexToCssString(colorIndex),
				...(selected ? selectedStyles : {}),
			}}
			onClick={handleClick}
		/>
	);
};
