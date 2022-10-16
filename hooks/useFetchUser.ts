import axios, { AxiosError } from "axios";
import getToken from "function/getToken";
import { useEffect, useState } from "react";
import { User } from "types";

const getRefreshTokenToAccessToken = async (refreshToken: string) => {
  const data = {
    refresh_token: refreshToken,
  };

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh`,
      data
    );

    return result.data;
  } catch (error: unknown) {
    throw new Error(`error: ${error}`);
  }
};

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const accToken = getToken("_hobby_at");

    if (!accToken) {
      setError("No access token");
      return;
    }

    const accTokenExp = getToken("_hobby_ae");

    if (!accTokenExp) {
      setError("No access token expiration");
      return;
    }

    const now = new Date().getTime();
    const exp = new Date(+accTokenExp * 1000).getTime();
    const diffSec = (exp - now) / 1000;
    const isExpiration = diffSec < 30;
    console.log(diffSec);

    if (isExpiration) {
      const token = getToken("_hobby_rt");
      if (!token) {
        setError("No refresh token");
        return;
      }
      getRefreshTokenToAccessToken(token).then(
        (data: { access_token: string; access_exp: number }) => {
          document.cookie = `_hobby_at=${data.access_token};`;
          document.cookie = `_hobby_ae=${data.access_exp};`;
        }
      );
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/user`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        const { id, username, password, nickname, profile } = res.data;
        const userData: User = {
          id,
          username,
          password,
          nickname,
          profile,
        };

        setUser(userData);
      })
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            const token = getToken("_hobby_rt");
            if (!token) {
              setError("No refresh token");
              return;
            }
            getRefreshTokenToAccessToken(token).then(
              (data: { access_token: string; access_exp: number }) => {
                document.cookie = `_hobby_at=${data.access_token};`;
                document.cookie = `_hobby_ae=${data.access_exp};`;
                return;
              }
            );
          }
        }
        setError(error);
        throw new Error(`error: ${error}`);
      });
  }, []);

  return { user, setUser, loading: !user && !error, error };
};

export { useFetchUser };
