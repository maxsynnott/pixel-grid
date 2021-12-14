import { axios } from "../clients/axios";

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

export const paint = async (x: number, y: number, color: number) => {
	const { status, data } = await axios.post("/paint", { x, y, color });

	switch (status) {
		case 204:
			return data;
		default:
			throw new Error();
	}
};
