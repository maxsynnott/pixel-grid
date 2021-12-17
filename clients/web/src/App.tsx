import { FC, useEffect, useState } from "react";
import Loading from "react-loading";
import { getGrid } from "./api/grid";
import { Grid } from "./components/Grid";
import { Palette } from "./components/Palette";
import { arrayBufferToImageData } from "./helpers/arrayBufferToImageData";

export const App: FC = () => {
	const [imageData, setImageData] = useState<ImageData>();
	useEffect(() => {
		getGrid().then((arrayBuffer) =>
			setImageData(arrayBufferToImageData(arrayBuffer))
		);
	}, []);

	return (
		<div className="centered full-height overflow-hidden">
			{imageData ? (
				<Grid imageData={imageData} />
			) : (
				<Loading type="cubes" width={100} height={100} />
			)}
			<Palette />
		</div>
	);
};
