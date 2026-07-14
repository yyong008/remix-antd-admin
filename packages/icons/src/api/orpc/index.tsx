import orpc from "./logo.webp";

export function ORpc({
  className,
  ...props
}: { className?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={className} src={orpc} {...props} />;
}
