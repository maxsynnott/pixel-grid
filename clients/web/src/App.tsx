import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";

export const App: FC = () => {
	return (
		<BrowserRouter>
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
		</BrowserRouter>
	);
};
