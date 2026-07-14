import { Button } from "@workspace/ui/components/button";
import { useNavigate } from "react-router";
import type { MetaFunction } from "react-router";
import { IconHelpCircle } from "@tabler/icons-react";
import * as m from "~/paraglide/messages.js";

export const meta: MetaFunction = () => {
  return [{ title: m.error_404_title() }, { name: "404", content: m.error_404_message() }];
};

export default function Route() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <IconHelpCircle className="size-24 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-6xl font-bold mb-4">{m.error_404_title()}</h1>
        <p className="text-xl text-muted-foreground mb-8">{m.error_404_message()}</p>
        <Button variant="default" onClick={() => navigate("/")}>
          {m.nav_home()}
        </Button>
      </div>
    </div>
  );
}
