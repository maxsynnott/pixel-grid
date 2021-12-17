import { axios } from "../clients/axios";
import { UpdatePixelBody } from "../types/types";

export const getGrid = async () => {
	const { status, data } = await axios.get<ArrayBuffer>("/grid", {
		responseType: "arraybuffer",
	});

	switch (status) {
		case 200:
			return data;
		default:
			throw new Error();
	}
};

export const updatePixel = async (body: UpdatePixelBody) => {
	const { status, data } = await axios.patch("/grid", body);

	switch (status) {
		case 204:
			return data;
		default:
			throw new Error();
	}
};
