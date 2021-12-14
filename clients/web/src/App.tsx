import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";
import { Pan } from "./components/Pan";
import { Zoom } from "./components/Zoom";
import { ZoomProvider } from "./contexts/ZoomContext";

export const App: FC = () => {
	return (
		<BrowserRouter>
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
					<Palette />
				</div>
			</ZoomProvider>
		</BrowserRouter>
	);
};
