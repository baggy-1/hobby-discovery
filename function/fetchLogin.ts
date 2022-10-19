import axios from "axios";
import { setCookie } from "util/cookie";

const fetchLogin = async (data: { username: string; password: string }) => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
    data
  );
  const {
    access_token: accessToken,
    access_exp: accessExp,
    refresh_token: refreshToken,
  } = result.data;

  setCookie("_hobby_at", accessToken);
  setCookie("_hobby_ae", accessExp);
  setCookie("_hobby_rt", refreshToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export default fetchLogin;
