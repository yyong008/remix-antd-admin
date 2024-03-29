import { ClientOnly } from "../ClientOnly";

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
