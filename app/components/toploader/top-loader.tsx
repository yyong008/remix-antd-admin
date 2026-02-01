import type { Fetcher } from "react-router";

import { useEffect, useMemo } from "react";
import * as NProgress from "nprogress";

export type LoaderProps = {
	/**
	 * Color for the TopLoader.
	 * @default "var(--primary)"
	 */
	color?: string;
	/**
	 * The initial position for the TopLoader in percentage, 0.08 is 8%.
	 * @default 0.08
	 */
	initialPosition?: number;
	/**
	 * The increament delay speed in milliseconds.
	 * @default 200
	 */
	crawlSpeed?: number;
	/**
	 * The height for the TopLoader in pixels (px).
	 * @default 3
	 */
	height?: number;
	/**
	 * Auto increamenting behaviour for the TopLoader.
	 * @default true
	 */
	crawl?: boolean;
	/**
	 * To show spinner or not.
	 * @default true
	 */
	showSpinner?: boolean;
	/**
	 * Animation settings using easing (a CSS easing string).
	 * @default "ease"
	 */
	easing?: string;
	/**
	 * Animation speed in ms for the TopLoader.
	 * @default 200
	 */
	speed?: number;
	/**
	 * Defines a shadow for the TopLoader.
	 * @default "0 0 10px ${color},0 0 5px ${color}"
	 *
	 * @ you can disable it by setting it to `false`
	 */
	shadow?: string | false;
	/**
	 * Defines a template for the TopLoader.
	 * @default "<div class="bar" role="bar"><div class="peg"></div></div>
	 * <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>"
	 */
	template?: string;
	/**
	 * Defines zIndex for the TopLoader.
	 * @default 1600
	 *
	 */
	zIndex?: number;
	/**
	 * To show the TopLoader at bottom.
	 * @default false
	 *
	 */
	showAtBottom?: boolean;
	/**
	 * To show the TopLoader for hash anchors.
	 * @default true
	 *
	 */
	showForHashAnchor?: boolean;
	useNavigation: any;
	useFetchers: any;
};

export const TopLoader = ({
	color = "var(--primary)",
	height = 3,
	showSpinner,
	crawl,
	crawlSpeed,
	initialPosition,
	easing,
	speed,
	shadow,
	template,
	zIndex = 1600,
	showAtBottom = false,
	useFetchers,
	useNavigation,
}: LoaderProps): React.JSX.Element => {
	const transition = useNavigation();

	const fetchers = useFetchers();
	const state = useMemo<"idle" | "loading">(
		function getGlobalState() {
			const states = [
				transition.state,
				...fetchers.map((fetcher: Fetcher) => fetcher.state),
			];
			if (states.every((state) => state === "idle")) return "idle";
			return "loading";
		},
		[transition.state, fetchers],
	);

	const boxShadow =
		!shadow && shadow !== undefined
			? ""
			: shadow
				? `box-shadow:${shadow}`
				: `box-shadow:0 0 10px ${color},0 0 5px ${color}`;

	// Check if to show at bottom
	const positionStyle = showAtBottom ? "bottom: 0;" : "top: 0;";
	const spinnerPositionStyle = showAtBottom ? "bottom: 15px;" : "top: 15px;";

	const styles = (
		<style>
			{`#nprogress{pointer-events:none}#nprogress .bar{background:${color};position:fixed;z-index:${zIndex};${positionStyle}left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:${zIndex};${spinnerPositionStyle}right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${color};border-left-color:${color};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
		</style>
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: all dependencies are included
	useEffect(() => {
		// and when it's something else it means it's either submitting a form or
		// waiting for the loaders of the next location so we start it
		NProgress.configure({
			showSpinner: showSpinner ?? true,
			trickle: crawl ?? true,
			trickleSpeed: crawlSpeed ?? 200,
			minimum: initialPosition ?? 0.08,
			easing: easing ?? "ease",
			speed: speed ?? 200,
			template:
				template ??
				'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
		});
		if (state === "loading") NProgress.start();
		// when the state is idle then we can to complete the progress bar
		if (state === "idle") NProgress.done();
	}, [transition.state]);

	return styles;
};
