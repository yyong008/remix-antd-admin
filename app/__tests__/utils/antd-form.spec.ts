import { expect, it } from "vite-plus/test";

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
