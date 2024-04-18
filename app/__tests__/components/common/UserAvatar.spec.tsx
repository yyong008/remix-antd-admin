import { expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";

// component
import UserAvatar from "~/components/common/UserAvatar";

describe("test UserAvatar component avatar", () => {
  beforeEach(() => {});

  it("test UserAvatar default url", () => {
    const testid = "testid";
    const WrapRole = () => (
      <div data-testid={testid}>
        <UserAvatar avatar="" />
      </div>
    );
    render(<WrapRole />);
    const userAvatar = screen.getByTestId(testid);
    expect(userAvatar).toBeInTheDocument();
    console.log("userAvatar", userAvatar.children);

    expect(
      userAvatar.children[0].children[0].children[0].getAttribute("src"),
    ).toBe("/images/user.jpg");
  });

  it("test UserAvatar default remixLogo", () => {
    const testid = "testid";
    const remixLogo = "/remix.png";
    const WrapRole = () => (
      <div data-testid={testid}>
        <UserAvatar avatar={remixLogo} />
      </div>
    );
    render(<WrapRole />);
    const userAvatar = screen.getByTestId(testid);
    expect(userAvatar).toBeInTheDocument();

    expect(
      userAvatar.children[0].children[0].children[0].getAttribute("src"),
    ).toBe(remixLogo);
  });
});
