type MProps = {
  path: string;
  dom: React.ReactNode;
};

export function MenuItemOutLink(props: MProps) {
  const { path, dom } = props;
  return (
    <a href={path} target={"_blank"} rel="noreferrer">
      {dom}
    </a>
  );
}
