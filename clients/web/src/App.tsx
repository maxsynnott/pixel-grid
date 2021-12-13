import { FC } from "react";
import { Grid } from "./components/Grid";
import { Zoom } from "./components/Zoom";

const MIN_ZOOM = 1;
const MAX_ZOOM = 100;
const ZOOM_SPEED = 0.01;

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
			<Zoom min={MIN_ZOOM} max={MAX_ZOOM} speed={ZOOM_SPEED}>
				<Grid />
			</Zoom>
		</div>
	);
};
