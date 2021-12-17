import { FC } from "react";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";

export const App: FC = () => {
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				overflow: "hidden",
			}}
		>
			<Grid />
			<Palette />
		</div>
	);
};
