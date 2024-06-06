import { expect, it } from "vitest";

import { identity } from "~/utils/client";

it("identity string", () => {
  expect(identity("")).toBe("");
  expect(identity("string")).toBe("string");
});

it("identity boolean", () => {
  expect(identity(false)).toBe(false);
  expect(identity(true)).toBe(true);
  expect(identity(!1)).toBe(false);
  expect(identity(!"string")).toBe(false);
});

it("identity number", () => {
  expect(identity(0)).toBe(0);
});

it("identity null", () => {
  expect(identity(null)).toBe(null);
});

it("identity undefine", () => {
  expect(identity(undefined)).toBe(undefined);
});

it("identity", () => {
  const fn = () => {};
  const obj = {};
  const arr: any[] = [];
  const symbol = Symbol();
  expect(identity(0)).toBe(0);
  expect(identity(1)).toBe(1);
  expect(identity("string")).toBe("string");
  expect(identity(false)).toBe(false);
  expect(identity(fn)).toBe(fn);
  expect(identity(obj)).toBe(obj);
  expect(identity(arr)).toBe(arr);
  expect(identity(symbol)).toBe(symbol);
  expect(identity(null)).toBe(null);
  expect(identity(undefined)).toBe(undefined);
});

it("identity", () => {
  const fn = () => {};
  const obj = {};
  const arr: any[] = [];
  const symbol = Symbol();

  expect(identity(fn)).toBe(fn);
  expect(identity(obj)).toBe(obj);
  expect(identity(arr)).toBe(arr);
  expect(identity(symbol)).toBe(symbol);
  expect(identity(null)).toBe(null);
  expect(identity(undefined)).toBe(undefined);
});
