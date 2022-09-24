import Seo from "components/Seo";
import { useRouter } from "next/router";
import Chevron from "public/asset/svg/Chevron";
import { useEffect, useState } from "react";

const hobbies = [
  {
    name: "입문용 서핑 패키지",
    id: "1",
    timestamp: "2022.08.18",
  },
  {
    name: "입문용 바느질 키트",
    id: "2",
    timestamp: "2022.06.18",
  },
];

const Profile = () => {
  const router = useRouter();
  const [openHobby, setOpenHobby] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <Seo title="마이프로필" />
      <div className="flex flex-col items-center justify-start space-y-6 min-h-[calc(100vh-3.5rem-5rem)] w-full pt-14 text-xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div>
            <div className="w-32 h-32 bg-red-500 rounded-full"></div>
          </div>
          <span>최강서퍼</span>
        </div>
        <div className="bg-[#F4BB5F] w-72 h-12 rounded text-white font-bold text-xl flex justify-center items-center">
          내 정보 수정
        </div>
        <div className="font-bold w-72">
          <div className="flex items-center justify-between h-12 border-0 border-b w-72">
            <span>내가 체험한 취미들</span>
            <div
              onClick={() => setOpenHobby((prev) => !prev)}
              className={`${
                openHobby ? "rotate-180" : "rotate"
              } text-[#8e8e8e] w-8 h-8`}
            >
              <Chevron />
            </div>
          </div>
          {openHobby && (
            <div
              className={`${
                openHobby ? "animate-open" : "animate-close"
              } w-72 h-40`}
            >
              {hobbies.map((hobby) => (
                <div
                  key={hobby.id}
                  className="flex items-center justify-between w-full h-12 text-base font-normal border-0 border-b opacity-70"
                >
                  <span>{hobby.name}</span>
                  <span>{hobby.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
