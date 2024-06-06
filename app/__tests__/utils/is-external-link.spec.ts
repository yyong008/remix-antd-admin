import * as clientUtils from "~/utils/client";

import { describe, expect, it } from "vitest";

describe("is external link", () => {
  it("test a normal https url", () => {
    expect(clientUtils.isExternalLink("https://www.example.com")).toBe(true);
  });

  it("test a normal http url", () => {
    expect(clientUtils.isExternalLink("http://www.example.com")).toBe(true);
  });

  it("test path", () => {
    expect(clientUtils.isExternalLink("/path/abc")).toBe(false);
  });

  it("test relative path", () => {
    expect(clientUtils.isExternalLink("path/abc")).toBe(false);
  });
});
