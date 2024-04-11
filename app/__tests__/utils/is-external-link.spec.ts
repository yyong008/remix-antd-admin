import { it, expect, describe } from "vitest";
import { isExternalLink } from "~/utils";

describe("is external link", () => {
  it("test a normal https url", () => {
    expect(isExternalLink("https://www.example.com")).toBe(true);
  });

  it("test a normal http url", () => {
    expect(isExternalLink("http://www.example.com")).toBe(true);
  });

  it("test path", () => {
    expect(isExternalLink("/path/abc")).toBe(false);
  });

  it("test relative path", () => {
    expect(isExternalLink("path/abc")).toBe(false);
  });
});
