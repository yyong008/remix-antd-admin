import zod from "./logo.png";

export function Zod({
  className,
  ...props
}: { className?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={className} src={zod} {...props} />;
}
