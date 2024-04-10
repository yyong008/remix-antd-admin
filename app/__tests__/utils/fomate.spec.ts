import { it, expect } from "vitest";

import { formatDate } from "~/utils/utils";

it("formate", () => {
  const timestamp = "2024-03-30 13:31:12";
  expect(formatDate(timestamp)).toMatchInlineSnapshot(`"2024-03-30 13:31:12"`);
  expect(formatDate(timestamp, "YYYY")).toMatchInlineSnapshot(`"2024"`);
  expect(formatDate(timestamp, "YYYY-MM-DD")).toMatchInlineSnapshot(
    `"2024-03-30"`,
  );
  expect(formatDate(timestamp, "HH:mm:ss")).toMatchInlineSnapshot(`"13:31:12"`);
});
