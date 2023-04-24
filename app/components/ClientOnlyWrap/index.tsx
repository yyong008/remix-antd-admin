import { ClientOnly } from "remix-utils";

export default function ClientOnlyWrap({ props = {}, children }: any) {
  return (
    <ClientOnly>
      {() => {
        return <>{children}</>;
      }}
    </ClientOnly>
  );
}
