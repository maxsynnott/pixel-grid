import { FC } from "react";
import { Grid } from "./components/Grid";
import { Pan } from "./components/Pan";
import { Zoom } from "./components/Zoom";
import { ZoomProvider } from "./contexts/ZoomContext";

export const App: FC = () => {
	return (
		<ZoomProvider>
			<div
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					overflow: "hidden",
				}}
			>
				<Zoom>
					<Pan>
						<Grid />
					</Pan>
				</Zoom>
			</div>
		</ZoomProvider>
	);
};
