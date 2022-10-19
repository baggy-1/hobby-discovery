import { authInstance } from "config/instance";

const authFetcher = async (url: string) => {
  const { data } = await authInstance.get(url);

  return data;
};

export { authFetcher };
