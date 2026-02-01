import type { Route } from "./+types/terms-of-service";

import { getTermsOfServiceData } from "~/features/cms/loader/legal-slug";
import LegalComponent from "~/features/cms/components/legal-slug/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
	return await getTermsOfServiceData({ params });
};
export default function LegalTermsOfServiceComponent({
	loaderData,
}: Route.ComponentProps) {
	return (
		<>
			<LegalComponent page={loaderData.page} />
		</>
	);
}
