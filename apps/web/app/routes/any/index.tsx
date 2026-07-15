import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { QuestionIcon } from "~/components/icons";
import { BrandButton } from "~/components/landings/_shared/brand-button";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.error_404_title() }, { name: "404", content: m.error_404_message() }];
};

export default function Route() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl bg-brand-surface text-brand-primary">
          <QuestionIcon className="size-12" />
        </div>
        <h1 className="bg-brand-gradient bg-clip-text text-7xl font-bold text-transparent">
          {m.error_404_title()}
        </h1>
        <p className="mb-8 mt-3 text-xl text-muted-foreground">{m.error_404_message()}</p>
        <Link to="/">
          <BrandButton size="lg">{m.nav_home()}</BrandButton>
        </Link>
      </div>
    </div>
  );
}
