import axios from "axios";
import { User } from "types";

const getUser = async (accToken: string) => {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/user`
    );

    return result.data as User;
  } catch (error: unknown) {
    throw new Error(`error: ${error}`);
  }
};

export default getUser;
