import { FC } from "react";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";

export const App: FC = () => {
	return (
		<div className="centered full-height overflow-hidden">
			<Grid />
			<Palette />
		</div>
	);
};
