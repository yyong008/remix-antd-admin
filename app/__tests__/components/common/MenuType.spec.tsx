import { expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

// component
import MenuType from "~/components/common/MenuType";

describe("test MenuType component", () => {
  beforeEach(() => {});

  it("test MenuType Component type 1:dir", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <MenuType type={1} />
      </div>
    );
    render(<WrapRole />);
    const menuTypeTypeOne = screen.getByTestId(testid);
    expect(menuTypeTypeOne).toBeInTheDocument();
    expect(menuTypeTypeOne.innerHTML).toContain("目录");
    expect(menuTypeTypeOne.innerHTML).toMatchInlineSnapshot(
      `"<span class="ant-tag ant-tag-green css-dev-only-do-not-override-1uweeqc">目录</span>"`,
    );
  });

  it("test MenuType Component type 2:menu", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <MenuType type={2} />
      </div>
    );
    render(<WrapRole />);
    const menuTypeTypeOne = screen.getByTestId(testid);
    expect(menuTypeTypeOne).toBeInTheDocument();
    expect(menuTypeTypeOne.innerHTML).toContain("菜单");
    expect(menuTypeTypeOne.innerHTML).toMatchInlineSnapshot(
      `"<span class="ant-tag ant-tag-blue css-dev-only-do-not-override-1uweeqc">菜单</span>"`,
    );
  });

  it("test MenuType Component type 3:perm", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <MenuType type={3} />
      </div>
    );
    render(<WrapRole />);
    const menuTypeTypeOne = screen.getByTestId(testid);
    expect(menuTypeTypeOne).toBeInTheDocument();
    expect(menuTypeTypeOne.innerHTML).toContain("权限");
    expect(menuTypeTypeOne.innerHTML).toMatchInlineSnapshot(
      `"<span class="ant-tag ant-tag-pink css-dev-only-do-not-override-1uweeqc">权限</span>"`,
    );
  });
});
