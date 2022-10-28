import { instance } from "config/instance";

const loop = async <T, Q extends keyof T>(
  array: T[],
  query: Q,
  storeObj: { [key in string]: unknown },
  getKey: (valueKey: string) => string
) => {
  const promises = array.map(async (item) => {
    const key = getKey(item[query] as string);
    const { data } = await instance.get(key);

    return {
      key,
      data,
    };
  });

  const results = await Promise.all(promises);
  results.forEach(({ key, data }) => (storeObj[key] = data));
};

export default loop;
