import axios from "axios";
import { useEffect } from "react";

const Hobby = () => {
  useEffect(() => {
    const fetchHobby = async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/main/hobby`
      );
      console.log(result);
    };

    fetchHobby();
  }, []);
  return <div>취미</div>;
};

export default Hobby;
