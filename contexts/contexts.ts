import { createContext } from "react";
import { User } from "types/user";

interface UserContext {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export { UserContext };
