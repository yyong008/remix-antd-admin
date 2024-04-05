import { Link } from "@remix-run/react";

type MProps = {
  path: string;
  dom: React.ReactNode;
  setPathname: (path: string) => void;
};

export default function MenuItemLink(props: MProps) {
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
