import { useRouter } from "next/router";

const useHandlePage = (path: string) => {
  const router = useRouter();

  return () => {
    router.push(path);
  };
};

export default useHandlePage;
