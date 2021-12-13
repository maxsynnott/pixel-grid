import __axios from "axios";
import { config } from "../config/config";

export const axios = __axios.create({
	baseURL: config.api.baseUrl,
});
