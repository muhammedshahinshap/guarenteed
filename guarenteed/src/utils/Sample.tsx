import axios from "axios";
import { getBearerAuthToken } from "./auth";
import { isNullOrUndefined } from "../Utils/Helpers";

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: "https://api.letsunbox.in",
  timeout: 100000,
});

// Request interceptor for API calls
APIKit.interceptors.request.use(
  async (config: any) => {
    const token = await getBearerAuthToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
// With retries
APIKit.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error: any) {
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest?._retry
    ) {
      ////console.log("Retry API call with refreshed token")
      originalRequest._retry = true;
      const token = await getBearerAuthToken(true);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return APIKit(originalRequest);
    }
    return Promise.reject(error);
  }
);

export async function safeAPICaller<Type>(fun: any): Promise<Type | undefined> {
  try {
    const response = await fun;
    if (response && response.status === 200) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (e) {
    console.error(e);
    // Bugsnag.notify(e)
    return undefined;
  }
}

export default APIKit;
