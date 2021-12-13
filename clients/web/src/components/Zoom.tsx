import { FC, useContext } from "react";
import { ZoomContext } from "../contexts/ZoomContext";

export const Zoom: FC = ({ children }) => {
	const zoom = useContext(ZoomContext);

	return <div style={{ transform: `scale(${zoom})` }}>{children}</div>;
};
