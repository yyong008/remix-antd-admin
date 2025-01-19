import "@testing-library/jest-dom/vitest";

// libs
import { expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

// types
import type { ComponentType } from "react";
// component
import DeleteIt from "~/components/common/delete-it";
import { createRoutesStub, useFetcher } from "react-router";

describe("test Footer component", () => {
  let Comp: ComponentType<{}>;
  beforeEach(() => {
     
    Comp = () => {
      const fetcher = useFetcher();
      return (
         
        <div data-testid="deleteit" role="delete-it">
          <DeleteIt title="news" fetcher={fetcher} record={{}} />
        </div>
      );
    };
  });

  it("test DeleteIt", async () => {
    const RemixStub = createRoutesStub([
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
    const RemixStub = createRoutesStub([
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
