import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import type { auth } from "./server";
import { getBaseUrl } from "~/utils/url";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [inferAdditionalFields<typeof auth>()],
});
