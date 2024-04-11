import { it, expect } from "vitest";
import { extname } from "~/server/utils/utils";

it("get extname", () => {
  expect(extname("name.png")).toBe(".png");
  expect(extname("http://example.com/name.png")).toEqual(".png");
  expect(extname("http://example.com/abc/name.jpg")).toEqual(".jpg");
});

it("get extname no params", () => {
  expect(extname("name.png?abc=1")).not.toBe(".png");
  expect(extname("http://example.com/name.png?abc=1")).not.toEqual(".png");
  expect(extname("http://example.com/abc/name.jpg?abc=1")).not.toEqual(".jpg");
});

it("get extname no point", () => {
  expect(extname("namepng")).toBe("");
  expect(extname("http://example.com/namepng")).toEqual("");
  expect(extname("http://example.com/abc/namejpg")).toEqual("");
});
