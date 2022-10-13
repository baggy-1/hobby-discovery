import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "types/user";

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.split("=")[0] === "_hobby_at")
      ?.split("=")[1];

    if (!accToken) return;

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
        if (axios.isAxiosError(error)) {
          throw new Error(`${error.name}, ${error.message}`);
        } else if (error instanceof Error) {
          throw new Error(error.message);
        }

        throw new Error("알 수 없는 에러가 발생했습니다.");
      });
  }, []);

  return { user, setUser };
};

export { useFetchUser };
