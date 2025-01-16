// types
import { useState, type ComponentType } from "react";

// libs
import { expect, it } from "vitest";
import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

// component
import MenuItemLink from "~/components/common/menu-item-link";

describe("test MenuItemLink component", () => {
  let Comp: ComponentType<{}>;
  const testid = "menu-item-link";
  beforeEach(() => {});

  it("test MenuItemLink dom", async () => {
    // eslint-disable-next-line react/display-name
    Comp = () => {
      const [pathName, setPathName] = useState("/about");
      return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div data-testid={testid}>
          <MenuItemLink
            path={pathName}
            dom={<>test dom</>}
            setPathname={() => {
              setPathName("/index");
            }}
          />
        </div>
      );
    };
    const RemixStub = createRoutesStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const menuItemLink = await screen.getByTestId(testid);
    expect(menuItemLink.innerHTML).toContain("test dom");
    expect(menuItemLink.children[0].getAttribute("href")).toBe("/about");
    expect(menuItemLink).toMatchInlineSnapshot(`
      <div
        data-testid="menu-item-link"
      >
        <a
          href="/about"
        >
          test dom
        </a>
      </div>
    `);
  });
});
