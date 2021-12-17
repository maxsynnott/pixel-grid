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
			style={{
				height: 30,
				width: 30,
				backgroundColor: colorIndexToCssString(colorIndex),
				cursor: "pointer",
				...(selected ? selectedStyles : {}),
			}}
			onClick={handleClick}
		></div>
	);
};
