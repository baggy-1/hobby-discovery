import axios from "axios";
import getToken from "function/getToken";
import { useEffect, useState } from "react";
import { User } from "types";

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
      const refToken = getToken("_hobby_rt");
      console.log(refToken);

      if (!refToken) {
        setError("No refresh token");
        return;
      }

      const data = {
        refreshToken: refToken,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh`, data, {
          headers: {
            Authorization: `Bearer ${refToken}`,
          },
        })
        .then((res) => {
          console.log(res);
        });

      return;
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
        setError(error);
        throw new Error(`error: ${error}`);
      });
  }, []);

  return { user, setUser, loading: !user && !error, error };
};

export { useFetchUser };
