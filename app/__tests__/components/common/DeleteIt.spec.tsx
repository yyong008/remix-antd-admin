// types
import type { ComponentType } from "react";

// libs
import { expect, it } from "vitest";
import { useFetcher } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

// component
import DeleteIt from "~/components/common/DeleteIt";

describe("test Footer component", () => {
  let Comp: ComponentType<{}>;
  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    Comp = () => {
      const fetcher = useFetcher();
      return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div data-testid="deleteit" role="delete-it">
          <DeleteIt title="news" fetcher={fetcher} record={{}} />
        </div>
      );
    };
  });

  it("test DeleteIt", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const deleteIt = await screen.getByRole("delete-it");
    await waitFor(() => expect(deleteIt).toBeInTheDocument());
    expect(deleteIt.children[0].tagName).toBe("FORM");
  });

  it("test DeleteIt children first element tag name must be form", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const deleteIt = await screen.getByRole("delete-it");
    expect(deleteIt.children[0].tagName).toBe("FORM");
  });
});
