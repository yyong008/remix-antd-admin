import { expect, it } from "vitest";

import { genFileListByName } from "~/utils/client";

it("formate", () => {
  const name = "remix";
  expect(genFileListByName(name)).toMatchInlineSnapshot(`
    [
      {
        "name": "remix",
        "response": {
          "data": {
            "name": "remix",
          },
        },
        "status": "done",
        "uid": "uid",
        "url": "remix",
      },
    ]
  `);
});
