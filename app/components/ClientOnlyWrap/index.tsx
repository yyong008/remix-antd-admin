import { ClientOnly } from "remix-utils";

// components
import FallbackSkeleton from "~/components/FallbackSkeleton";

export default function ClientOnlyWrap({ props = {}, children }: any) {
  return (
    <ClientOnly fallback={<FallbackSkeleton />}>
      {() => {
        return <>{children}</>;
      }}
    </ClientOnly>
  );
}
