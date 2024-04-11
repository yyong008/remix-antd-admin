import { lastValueFrom } from "rxjs";
import { it, expect } from "vitest";

import { getPaginationByRequest$ } from "~/utils/pagination.util";

it("formate from observable", async () => {
  expect(
    await lastValueFrom(
      getPaginationByRequest$(
        new Request("https://www.mozilla.org/favicon.ico"),
      ),
    ),
  ).toMatchInlineSnapshot(`
    {
      "name": "",
      "page": 1,
      "pageSize": 10,
    }
  `);

  expect(
    await lastValueFrom(
      getPaginationByRequest$(
        new Request(
          "https://www.mozilla.org/news?page=5&pageSize=10&name=yourname",
        ),
      ),
    ),
  ).toMatchInlineSnapshot(`
    {
      "name": "yourname",
      "page": 5,
      "pageSize": 10,
    }
  `);
});
