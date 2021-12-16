import { FC, useContext } from "react";
import { CameraContext } from "../contexts/CameraContext";

export const Zoom: FC = ({ children }) => {
	const { zoom } = useContext(CameraContext);

	return <div style={{ transform: `scale(${zoom})` }}>{children}</div>;
};
