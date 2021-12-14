import { FC } from "react";
import { colorIndexToCssString } from "../helpers/colorIndexToCssString";

interface Props {
	colorIndex: number;
}

export const PaletteColor: FC<Props> = ({ colorIndex }) => {
	const isSelected = colorIndex === Number(localStorage.getItem("colorIndex"));
	const handleClick = () =>
		localStorage.setItem("colorIndex", colorIndex.toString());

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
			onClick={handleClick}
		></div>
	);
};
