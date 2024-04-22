import { it, expect } from "vitest";
import { getSearchParams } from "~/server/utils";

it("test requtes empty", () => {
  const request = new Request("https://www.example.com/abc");
  expect(getSearchParams(request, "name")).toMatchInlineSnapshot(`null`);
});

it("test requtes search params name", () => {
  const request = new Request("https://www.example.com?name=react");
  expect(getSearchParams(request, "name")).toBe("react");
});

it("test requtes search multi params name", () => {
  const request = new Request("https://www.example.com?name=react&time=2013");
  expect(getSearchParams(request, "name")).toBe("react");
  expect(getSearchParams(request, "time")).toBe("2013");
});
