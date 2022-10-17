import { useFetchUser } from "hooks/useFetchUser";
import { useRouter } from "next/router";
import LoginForm from "components/view/login/LoginForm";

const LoginView = () => {
  const router = useRouter();
  const { user } = useFetchUser();

  if (user) {
    router.replace("/");
  }

  return (
    <>
      <div className="w-screen min-h-screen text-lg text-black bg-white dark:bg-black dark:text-white">
        <div className="flex flex-col items-center justify-start border-b w-full h-96 border-[#8e8e8e] py-7">
          <div className="m-8 text-2xl font-bold">로그인</div>
          <LoginForm />
        </div>
        <div className="mt-8 space-y-8">
          <div className="flex flex-col items-center justify-center">
            <span>처음이신가요?</span>
            <span onClick={() => router.replace("/signup")}>회원가입하기</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginView;
