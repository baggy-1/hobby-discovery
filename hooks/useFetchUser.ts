import getAccessTokenUseRefreshToken from "function/getAccessTokenUseRefreshToken";
import getDiffTimeSec from "function/getDiffTimeSec";
import getToken from "function/getToken";
import getUser from "function/getUser";
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

    const diffSec = getDiffTimeSec(+accTokenExp);
    const isExpiration = diffSec < 30;

    if (isExpiration) {
      const token = getToken("_hobby_rt");
      if (!token) {
        setError("No refresh token");
        return;
      }
      getAccessTokenUseRefreshToken(token)
        .then(({ access_token, access_exp }) => {
          document.cookie = `_hobby_at=${access_token};`;
          document.cookie = `_hobby_ae=${access_exp};`;

          getUser(access_token)
            .then((user) => {
              setUser(user);
            })
            .catch((error) => {
              setError(error);
              return;
            });
        })
        .catch((error) => {
          setError(error);
          return;
        });
    } else {
      getUser(accToken)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          setError(error);
          return;
        });
    }
  }, []);

  return { user, setUser, loading: !user && !error, error };
};

export { useFetchUser };
