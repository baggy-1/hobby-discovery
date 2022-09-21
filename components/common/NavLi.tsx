import { useRouter } from "next/router";

interface Props {
  title: string;
  path: string;
}

const NavLi = ({ title, path }: Props) => {
  const router = useRouter();

  return (
    <li className="cursor-pointer" onClick={() => router.push(path)}>
      {title}
    </li>
  );
};

export default NavLi;
