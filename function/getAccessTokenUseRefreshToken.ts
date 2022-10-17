import axios from "axios";

const getAccessTokenUseRefreshToken = async (refreshToken: string) => {
  const data = {
    refresh_token: refreshToken,
  };

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh`,
      data
    );

    return result.data as { access_token: string; access_exp: number };
  } catch (error: unknown) {
    throw new Error(`error: ${error}`);
  }
};

export default getAccessTokenUseRefreshToken;
