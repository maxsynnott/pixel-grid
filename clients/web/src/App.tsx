import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";
import { Pan } from "./components/Pan";
import { Zoom } from "./components/Zoom";
import { CameraProvider } from "./contexts/CameraContext";

export const App: FC = () => {
	return (
		<BrowserRouter>
			<CameraProvider>
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
			</CameraProvider>
		</BrowserRouter>
	);
};
