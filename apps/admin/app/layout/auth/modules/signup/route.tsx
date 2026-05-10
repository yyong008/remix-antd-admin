import { AuthMarketingShell } from "../../AuthMarketingShell";
import { Left } from "./components/Left";

export function Route() {
  return (
    <AuthMarketingShell variant="signup">
      <Left />
    </AuthMarketingShell>
  );
}