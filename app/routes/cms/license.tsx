import type { Route } from "./+types/license";

import {  getLicenseData } from "~/features/cms/loader/legal-slug";
import LegalComponent from "~/features/cms/components/legal-slug/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
  return await getLicenseData({ params });
};



export default function LegalLicenseComponent({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <LegalComponent page={loaderData.page} />
    </>
  );
}
