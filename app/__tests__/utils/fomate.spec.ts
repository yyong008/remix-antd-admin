import { it, expect } from "vitest";

import { formatDate } from "~/utils/utils";

it("formate time fomate string", () => {
  const timestamp = "2024-03-30 13:31:12";
  expect(formatDate(timestamp)).toMatchInlineSnapshot(`"2024-03-30 13:31:12"`);
  expect(formatDate(timestamp, "YYYY")).toMatchInlineSnapshot(`"2024"`);
  expect(formatDate(timestamp, "YYYY-MM-DD")).toMatchInlineSnapshot(
    `"2024-03-30"`,
  );
  expect(formatDate(timestamp, "HH:mm:ss")).toMatchInlineSnapshot(`"13:31:12"`);
});

it("formate timestamp(number)", () => {
  const timestamp = 1712073602000;
  expect(formatDate(timestamp)).toMatchInlineSnapshot(`"2024-04-03 00:00:02"`);
});

it("formate timestamp(string)", () => {
  const timestamp = "1712073602000";
  expect(formatDate(new Date(timestamp))).toMatchInlineSnapshot(
    `"Invalid Date"`,
  );
});
