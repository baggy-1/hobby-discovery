import Seo from "components/Seo";
import Image from "next/image";
import useSWR from "swr";
import { Hobby } from "types";

const Hobby = () => {
  const { data } = useSWR<Hobby[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/main/hobby`
  );

  return (
    <>
      <Seo title="취미" />
      {data?.map((hobby) => (
        <div key={hobby.id}>
          <div>{hobby.hobby_title}</div>
          <div>{hobby.descrition}</div>
          <Image
            src={hobby.hobby_image}
            alt={hobby.hobby_title}
            width={100}
            height={100}
          />
        </div>
      ))}
    </>
  );
};

export default Hobby;
