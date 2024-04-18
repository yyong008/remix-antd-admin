// types
import type { ComponentType } from "react";

// libs
import { expect, it } from "vitest";
import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

// component
import FormatTime from "~/components/common/FormatTime";

describe("test FormatTime component", () => {
  let Comp: ComponentType<{}>;
  beforeEach(() => {});

  it("test FormateTime time string", async () => {
    // eslint-disable-next-line react/display-name
    Comp = () => {
      return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div data-testid="format-time">
          <FormatTime timeStr="2024-03-30 13:31:12" />
        </div>
      );
    };
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const formatTime = await screen.getByTestId("format-time");
    expect(formatTime).toMatchInlineSnapshot(`
      <div
        data-testid="format-time"
      >
        2024-03-30 13:31:12
      </div>
    `);
  });

  it("test FormateTime timestamp", async () => {
    // eslint-disable-next-line react/display-name
    Comp = () => {
      return (
        // eslint-disable-next-line jsx-a11y/aria-role
        <div data-testid="format-time">
          <FormatTime timeStr={1713415179510} />
        </div>
      );
    };
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: Comp,
      },
    ]);
    render(<RemixStub initialEntries={["/"]} />);
    const formatTime = await screen.getByTestId("format-time");
    expect(formatTime).toMatchInlineSnapshot(`
      <div
        data-testid="format-time"
      >
        2024-04-18 12:39:39
      </div>
    `);
  });
});
