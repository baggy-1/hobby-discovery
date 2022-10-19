import { authFetcher } from "config/fetcher";
import useSWR from "swr";
import { User } from "types";

const useUser = () => {
  const { data: user } = useSWR<User>("/user/user", authFetcher);

  return {
    user,
  };
};

export default useUser;
