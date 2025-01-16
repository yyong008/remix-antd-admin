// types
import { type ComponentType } from "react";

// libs
import { expect, it } from "vitest";
import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

// component
import MenuItemOuterLink from "~/components/common/menu-item-outer-link";

describe("test MenuItemOuterLink component", () => {
  let Comp: ComponentType<{}>;
  const testid = "menu-item-outer-link";
  beforeEach(() => {
    // eslint-disable-next-line react/display-name
    Comp = () => {
      return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div data-testid={testid}>
          <MenuItemOuterLink path={"/about"} dom={<>test dom</>} />
        </div>
      );
    };
  });

  it("test MenuItemOuterLink dom", async () => {
    // eslint-disable-next-line react/display-name

    const RemixStub = createRoutesStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const menuItemOuterLink = await screen.getByTestId(testid);
    expect(menuItemOuterLink.innerHTML).toContain("test dom");
    expect(menuItemOuterLink.children[0].getAttribute("href")).toBe("/about");
    expect(menuItemOuterLink.children[0].getAttribute("target")).toBe("_blank");
  });

  it("test MenuItemOutLink dom snapshot", async () => {
    const RemixStub = createRoutesStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const menuItemOuterLink = await screen.getByTestId(testid);
    expect(menuItemOuterLink).toMatchInlineSnapshot(`
      <div
        data-testid="menu-item-outer-link"
      >
        <a
          href="/about"
          rel="noreferrer"
          target="_blank"
        >
          test dom
        </a>
      </div>
    `);
  });
});
