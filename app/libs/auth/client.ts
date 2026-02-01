import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

import type { auth } from "./server";

export const authClient = createAuthClient({
	baseURL: "http://localhost:5173",
	plugins: [inferAdditionalFields<typeof auth>()],
});
