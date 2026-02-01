import * as clientUtils from "~/utils/client";

import { describe, expect, it } from "vitest";

describe("test remove html tag", () => {
	const rich =
		"<script src='./index.tsx'>console.log('hello remix antd admin')</scrpt>";
	it("remove script tag", () => {
		expect(clientUtils.removeHtmlTag(rich)).toMatchInlineSnapshot(
			`"console.log('hello remix antd admin')"`,
		);
	});

	it("should no contain script world", () => {
		expect(clientUtils.removeHtmlTag(rich)).not.contain("script");
	});
});
