import { axios } from "../clients/axios";

export const getGrid = async () => {
	const { status, data } = await axios.get("/grid");

	switch (status) {
		case 200:
			return data;
		default:
			throw new Error();
	}
};
