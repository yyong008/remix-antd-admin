import { lastValueFrom } from "rxjs";
import { it, expect } from "vitest";

import * as clientUtils from "~/utils";

it("formate from observable", async () => {
  expect(
    await lastValueFrom(
      clientUtils.getPaginationByRequest$(
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
      clientUtils.getPaginationByRequest$(
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
