import { expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";

// component
import ButtonLink from "~/components/common/ButtonLink";

describe("test Footer component", () => {
  let buttonLink: any;
  beforeEach(() => {});

  it("test buttonLink in the document", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          // eslint-disable-next-line jsx-a11y/aria-role
          <div role="button-link">
            <ButtonLink type="edit" to={"/about"} content="about" />
          </div>
        ),
      },
    ]);
    render(<RemixStub />);
    buttonLink = screen.getByRole("button-link");
    expect(buttonLink).toBeInTheDocument();
  });

  it("test buttonLink new", () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => (
          // eslint-disable-next-line jsx-a11y/aria-role
          <div role="button-link">
            <ButtonLink type="new" to={"/about"} content="new" />
          </div>
        ),
      },
    ]);
    render(<RemixStub />);
    buttonLink = screen.getByRole("button-link");
    expect(buttonLink).contains("new");
  });
});
