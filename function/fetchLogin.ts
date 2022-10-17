import axios from "axios";

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
  document.cookie = `_hobby_at=${accessToken};`;
  document.cookie = `_hobby_ae=${accessExp};`;
  document.cookie = `_hobby_rt=${refreshToken};`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export default fetchLogin;
