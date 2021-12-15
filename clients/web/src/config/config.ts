const environment = import.meta.env.MODE;

export const config = {
	api: {
		baseUrl:
			environment === "production"
				? "https://api.pixelgrid.xyz"
				: "http://localhost:8080",
	},
	colors: [
		[255, 255, 255, 255],
		[0, 0, 0, 255],
		[192, 192, 192, 255],
		[128, 128, 128, 255],
		[128, 0, 0, 255],
		[255, 0, 0, 255],
		[128, 0, 128, 255],
		[255, 0, 255, 255],
		[0, 128, 0, 255],
		[0, 255, 0, 255],
		[128, 128, 0, 255],
		[255, 255, 0, 255],
		[0, 0, 128, 255],
		[0, 0, 255, 255],
		[0, 128, 128, 255],
		[0, 255, 255, 255],
	],
	grid: {
		height: 1000,
		width: 1000,
		zoom: {
			initialValue: 0.6,
			min: 0.5,
			max: 100,
			speed: 0.1,
		},
	},
};
