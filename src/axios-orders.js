import axios from "axios";

const instance = axios.create({
	baseURL: "https://composed-amulet-263513.firebaseio.com/",
});

export default instance;
