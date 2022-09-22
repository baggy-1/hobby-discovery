import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface Props {
  title: string;
  event: MouseEventHandler<HTMLLIElement>;
}

const NavLi = ({ title, event }: Props) => {
  return (
    <li className="cursor-pointer" onClick={event}>
      {title}
    </li>
  );
};

export default NavLi;
