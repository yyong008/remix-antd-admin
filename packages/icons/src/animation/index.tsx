import motion from "./logo.png";

export function MotionLogo({
  className,
  ...props
}: { className?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={className} src={motion} {...props} />;
}
