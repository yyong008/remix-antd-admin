import { afterEach } from "vite-plus/test";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
	cleanup();
});
