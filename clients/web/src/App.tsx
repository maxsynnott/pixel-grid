import { FC } from "react";
import { Grid } from "./components/Grid";

export const App: FC = () => {
	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Grid />
		</div>
	);
};
