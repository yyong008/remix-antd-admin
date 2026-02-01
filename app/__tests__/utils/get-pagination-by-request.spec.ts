import * as clientUtils from "~/utils/client";

import { expect, it } from "vitest";

it("formate from observable", async () => {
	expect(
		clientUtils.getPaginationByRequest$(
			new Request("https://www.mozilla.org/favicon.ico"),
		),
	).toMatchInlineSnapshot(`
    {
      "name": "",
      "page": 1,
      "pageSize": 10,
    }
  `);

	expect(
		clientUtils.getPaginationByRequest$(
			new Request(
				"https://www.mozilla.org/news?page=5&pageSize=10&name=yourname",
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
