import { authFetcher } from "config/fetcher";
import useSWR from "swr";
import { User } from "types";

const useUser = () => {
  const { data: user, error } = useSWR<User>("/user/user", authFetcher);

  return {
    user,
    loading: !error && !user,
    error,
  };
};

export default useUser;
