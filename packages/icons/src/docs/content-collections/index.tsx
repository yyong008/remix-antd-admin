import cc from "./logo.png";

export function ContentCollections({
  className,
  ...props
}: { className?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={className} src={cc} {...props} />;
}
