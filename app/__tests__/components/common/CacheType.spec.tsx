import "@testing-library/jest-dom/vitest";

import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

// component
import CacheType from "~/components/common/cache-type";

describe("test Footer component", () => {
  beforeEach(() => {});

  it("test CacheType Component isCache null", () => {
    const WrapRole = () => (
      <div data-testid="cache-type">
        <CacheType isCache={null} />
      </div>
    );
    render(<WrapRole />);
    const cacheType = screen.getByTestId("cache-type");
    expect(cacheType).toBeInTheDocument();
    expect(cacheType.innerHTML).toContain("-");
  });

  it("test CacheType Component isCache 0", () => {
    const WrapRole = () => (
      <div data-testid="cache-type">
        <CacheType isCache={0} />
      </div>
    );
    render(<WrapRole />);
    const cacheType = screen.getByTestId("cache-type");
    expect(cacheType).toBeInTheDocument();
    expect(cacheType.innerHTML).toContain("否");
  });

  it("test CacheType Component isCache 1", () => {
    const WrapRole = () => (
      <div data-testid="cache-type">
        <CacheType isCache={1} />
      </div>
    );
    render(<WrapRole />);
    const cacheType = screen.getByTestId("cache-type");
    expect(cacheType).toBeInTheDocument();
    expect(cacheType.innerHTML).toContain("是");
  });
});
