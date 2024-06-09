import "@testing-library/jest-dom/vitest";

import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

// component
import ShowType from "~/components/common/show-type";

describe("test ShowType component", () => {
  beforeEach(() => {});

  it("test ShowType Component isShow null", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <ShowType isShow={null} />
      </div>
    );
    render(<WrapRole />);
    const showType = screen.getByTestId(testid);
    expect(showType).toBeInTheDocument();
    expect(showType.innerHTML).toContain("-");
  });

  it("test ShowType Component isShow 0", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <ShowType isShow={0} />
      </div>
    );
    render(<WrapRole />);
    const showType = screen.getByTestId(testid);
    expect(showType).toBeInTheDocument();
    expect(showType.innerHTML).toContain("否");
  });

  it("test ShowType Component isShow 1", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <ShowType isShow={1} />
      </div>
    );
    render(<WrapRole />);
    const showType = screen.getByTestId(testid);
    expect(showType).toBeInTheDocument();
    expect(showType.innerHTML).toContain("是");
  });
});
