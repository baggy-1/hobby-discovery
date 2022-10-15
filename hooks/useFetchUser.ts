import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "types/user";

const getToken = (name: string) => {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.split("=")[0] === name)
    ?.split("=")[1];

  return token;
};

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accToken = getToken("_hobby_at");

    if (!accToken) return;

    const accTokenExp = getToken("_hobby_ae");

    if (!accTokenExp) return;

    const now = new Date().getTime();
    const exp = new Date(+accTokenExp * 1000).getTime();
    const diffSec = exp - now / 1000;
    const isExpiration = diffSec < 30;

    if (isExpiration) {
      const refToken = getToken("_hobby_rt");

      if (!refToken) return;
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
        throw new Error(`error: ${error}`);
      });
  }, []);

  return { user, setUser };
};

export { useFetchUser };
