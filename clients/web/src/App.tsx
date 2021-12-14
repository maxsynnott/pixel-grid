import { FC, useState } from "react";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";
import { Pan } from "./components/Pan";
import { Zoom } from "./components/Zoom";
import { ZoomProvider } from "./contexts/ZoomContext";

export const App: FC = () => {
	const [selectedColorIndex, setSelectedColorIndex] = useState(0);

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
						<Grid selectedColor={selectedColorIndex} />
					</Pan>
				</Zoom>
				<Palette
					selectedColorIndex={selectedColorIndex}
					setSelectedColorIndex={setSelectedColorIndex}
				/>
			</div>
		</ZoomProvider>
	);
};
