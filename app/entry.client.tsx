import { startTransition, } from "react";

import { HydratedRouter } from "react-router/dom";
import { hydrateRoot } from "react-dom/client";

const AppClient = () => {
	return (
			<HydratedRouter />
	);
};

async function hydrate() {
	startTransition(() => {
		hydrateRoot(
			document,
			<AppClient />,
		);
	});
}

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate);
} else {
	// Safari doesn't support requestIdleCallback
	// https://caniuse.com/requestidlecallback
	window.setTimeout(hydrate, 1);
}
