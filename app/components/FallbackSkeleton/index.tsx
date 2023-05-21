import { PageContainer } from "@ant-design/pro-components";
import { Skeleton } from "antd";

export default function FallbackSkeleton() {
  return (
    <PageContainer>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </PageContainer>
  );
}
