import type { Route } from "./+types/privacy-policy";

import { getPrivacyPolicyData } from "~/features/cms/loader/legal-slug";
import LegalComponent from "~/features/cms/components/legal-slug/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
	return await getPrivacyPolicyData({ params });
};

export default function LegalPrivacyPolicyComponent({
	loaderData,
}: Route.ComponentProps) {
	return (
		<>
			<LegalComponent page={loaderData.page} />
		</>
	);
}
