import axios, { AxiosError } from "axios";
import { getCookie, setCookie } from "util/cookie";

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
});

authInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("_hobby_at");

    const headers = config.headers || {};
    headers["Authorization"] = "";

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    }
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const { response, config } = error;

    if (response?.status === 401) {
      const refreshToken = getCookie("_hobby_rt");

      if (refreshToken) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const { access_token, access_exp } = data;
        setCookie("_hobby_at", access_token);
        setCookie("_hobby_ae", access_exp);

        const headers = config.headers || {};
        headers["Authorization"] = `Bearer ${access_token}`;

        return axios(config);
      }
    }
    return Promise.reject(error);
  }
);

export { authInstance };
