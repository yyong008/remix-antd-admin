import { describe, expect, it } from "vitest";
import {
  respByData$,
  respPresentationModeJson,
  respUnAuthJson,
  respUnSupportJson,
  rfj,
  rsj,
} from "~/utils/server";

import { lastValueFrom } from "rxjs";

describe("test response json success", () => {
  it("snapshot test empty json  ok/status", async () => {
    expect(rsj({}).ok).toMatchInlineSnapshot(`true`);
    expect(rsj({}).status).toMatchInlineSnapshot(`200`);
    expect(rsj({}).statusText).toMatchInlineSnapshot(`""`);
  });

  it("snapshot test header", async () => {
    expect(rsj({}).headers.get("content-type")).toMatchInlineSnapshot(
      `"application/json; charset=utf-8"`,
    );
  });

  it("snapshot test json", async () => {
    expect(await rsj({ userInfo: { name: "tim" } }).json())
      .toMatchInlineSnapshot(`
    {
      "code": 0,
      "data": {
        "userInfo": {
          "name": "tim",
        },
      },
      "message": "success",
    }
  `);
  });

  it("snapshot test success json code should equal 0", async () => {
    expect((await rsj({}).json()).code).toBe(0);
  });
});

describe("test response json fail", () => {
  it("snapshot test empty json  ok/status", async () => {
    expect(rfj({}).ok).toMatchInlineSnapshot(`true`);
    expect(rfj({}).status).toMatchInlineSnapshot(`200`);
    expect(rfj({}).statusText).toMatchInlineSnapshot(`""`);
  });

  it("snapshot test header", async () => {
    expect(rfj({}).headers.get("content-type")).toMatchInlineSnapshot(
      `"application/json; charset=utf-8"`,
    );
  });

  it("snapshot test json", async () => {
    expect(await rfj({ userInfo: { name: "tim" } }).json())
      .toMatchInlineSnapshot(`
        {
          "code": 1,
          "data": {
            "userInfo": {
              "name": "tim",
            },
          },
          "message": "fail",
        }
      `);
  });

  it("snapshot test fail json code should equal 0", async () => {
    expect((await rfj({}).json()).code).toBe(1);
  });
});

describe("test respByData$", async () => {
  it("should return a function (observable)", async () => {
    respByData$({}).subscribe({
      next(v) {
        expect(typeof v).toBe("function");
      },
    });

    expect(typeof (await lastValueFrom(respByData$({})))).toBe("function");
  });
  it("should return a function(promise)", async () => {
    expect(typeof (await lastValueFrom(respByData$({})))).toBe("function");
  });

  it("should return a function with false and code must equal 1", async () => {
    expect((await (await lastValueFrom(respByData$(null)))().json()).code).toBe(
      1,
    );
  });

  it("should return a function with true and code must equal 0", async () => {
    expect(
      (await (await lastValueFrom(respByData$({ x: 1 })))().json()).code,
    ).toBe(0);
  });
});

describe("test respPresentationModeJson", async () => {
  it("respPresentationModeJson message", async () => {
    expect((await respPresentationModeJson().json()).message).toBe(
      "演示模式：仅能进行获取",
    );
  });
});

describe("test respUnAuthJson", async () => {
  it("respUnAuthJson message", async () => {
    expect((await respUnAuthJson().json()).message).toBe("未授权");
  });
});

describe("test respUnSupportJson", async () => {
  it("respUnSupportJson message", async () => {
    expect((await respUnSupportJson().json()).message).toBe("暂不支持");
  });
});
