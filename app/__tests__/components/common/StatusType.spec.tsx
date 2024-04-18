import { expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

// component
import StatusType from "~/components/common/StatusType";

describe("test StatusType component", () => {
  beforeEach(() => {});

  it("test StatusType Component status null", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <StatusType status={null} />
      </div>
    );
    render(<WrapRole />);
    const statusType = screen.getByTestId(testid);
    expect(statusType).toBeInTheDocument();
    expect(statusType.innerHTML).toContain("-");
  });

  it("test StatusType Component status 0", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <StatusType status={0} />
      </div>
    );
    render(<WrapRole />);
    const statusType = screen.getByTestId(testid);
    expect(statusType).toBeInTheDocument();
    expect(statusType.innerHTML).toContain("禁用");
  });

  it("test StatusType Component status 1", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <StatusType status={1} />
      </div>
    );
    render(<WrapRole />);
    const statusType = screen.getByTestId(testid);
    expect(statusType).toBeInTheDocument();
    expect(statusType.innerHTML).toContain("启用");
  });
});
