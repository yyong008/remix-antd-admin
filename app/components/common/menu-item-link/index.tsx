import { Link } from "react-router";

type MProps = {
  path: string;
  dom: React.ReactNode;
  setPathname: (path: string) => void;
};

export function MenuItemLink(props: MProps) {
  const { path, dom, setPathname } = props;
  return (
    <Link
      to={path!}
      onClick={() => {
        setPathname(path || "/welcome");
      }}
    >
      {dom}
    </Link>
  );
}
