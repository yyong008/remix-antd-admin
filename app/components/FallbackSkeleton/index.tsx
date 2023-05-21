import { Skeleton } from "antd";

export default function FallbackSkeleton() {
  return (
    <div
      style={{
        padding: "20px 50px",
      }}
    >
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
