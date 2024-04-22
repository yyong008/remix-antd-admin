import { it, expect } from "vitest";

import { genFileListByName } from "~/utils";

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
