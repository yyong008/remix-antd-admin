import type { Route } from "./+types/cookie-policy";

import { getCookiePolicyData } from "~/features/cms/loader/legal-slug";
import LegalComponent from "~/features/cms/components/legal-slug/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
  return await getCookiePolicyData({ params });
};

export default function LegalPage({ loaderData }: Route.ComponentProps) {

  return (
    <>
      <LegalComponent page={loaderData.page} />
    </>
  );
}
