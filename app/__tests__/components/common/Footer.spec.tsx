import "@testing-library/jest-dom/vitest";

import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

// component
import Footer from "../../../components/common/footer";

describe("test Footer component", () => {
	let remix: any;
	beforeEach(() => {
		render(<Footer />);
		remix = screen.getByText(/Remix/i);
	});

	it("Footer remix element and attribute", () => {
		expect(remix.tagName).toBe("A");
		expect(remix.getAttribute("href")).toBe("https://remix.run/");
		expect(remix).toBeInTheDocument();
	});

	it("Footer remix Snapshot", () => {
		expect(remix).toMatchInlineSnapshot(`
      <a
        class="ant-pro-global-footer-list-link"
        href="https://remix.run/"
        rel="noreferrer"
        target="_blank"
        title="Remix"
      >
        Remix
      </a>
    `);
	});
});
