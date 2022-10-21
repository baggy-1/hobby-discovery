import { authInstance, instance } from "config/instance";

const authFetcher = async (url: string) => {
  const { data } = await authInstance.get(url);

  return data;
};

const fetcher = async (url: string) => {
  const { data } = await instance.get(url);

  return data;
};

export { fetcher, authFetcher };
