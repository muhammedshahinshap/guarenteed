import axios from "axios";
const API_URL = "https://guarenteed.tech/";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
export { API_URL };
