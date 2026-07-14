import { AuthMarketingShell } from "../../AuthMarketingShell";
import { Right } from "./components/Right";

export function Route() {
  return (
    <AuthMarketingShell variant="login">
      <Right />
    </AuthMarketingShell>
  );
}
