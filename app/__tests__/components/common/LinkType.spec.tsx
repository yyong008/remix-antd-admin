import "@testing-library/jest-dom/vitest";

import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

// component
import LinkType from "~/components/common/link-type";

describe("test Footer component", () => {
  beforeEach(() => {});

  it("test LinkType Component isLink null", () => {
    const WrapRole = () => (
      <div data-testid="link-type">
        <LinkType isLink={null} />
      </div>
    );
    render(<WrapRole />);
    const linkType = screen.getByTestId("link-type");
    expect(linkType).toBeInTheDocument();
    expect(linkType.innerHTML).toContain("-");
  });

  it("test CacheType Component isLink 0", () => {
    const WrapRole = () => (
      <div data-testid="link-type">
        <LinkType isLink={0} />
      </div>
    );
    render(<WrapRole />);
    const linkType = screen.getByTestId("link-type");
    expect(linkType).toBeInTheDocument();
    expect(linkType.innerHTML).toContain("否");
  });

  it("test CacheType Component isLink 1", () => {
    const WrapRole = () => (
      <div data-testid="link-type">
        <LinkType isLink={1} />
      </div>
    );
    render(<WrapRole />);
    const linkType = screen.getByTestId("link-type");
    expect(linkType).toBeInTheDocument();
    expect(linkType.innerHTML).toContain("是");
  });
});
