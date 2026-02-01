import { i18n } from "./i18n";
import { icons } from "lucide-react";
import { createElement } from "react";
import { loader } from "fumadocs-core/source";
import { docs, legal } from "#source/server";

/**
 * Create icon component from icon name
 * @param icon - Icon name from lucide-react
 * @returns React element or undefined if icon not found
 */
const createIconComponent = (icon: string | undefined) => {
	if (!icon) {
		return;
	}
	if (icon in icons) {
		return createElement(icons[icon as keyof typeof icons]);
	} else if (import.meta.env.DEV) {
		console.warn(`Icon "${icon}" not found in lucide-react icons.`);
	}
};

/**
 * Documentation source loader configuration
 */
export const docsSource = loader({
	source: docs.toFumadocsSource(),
	baseUrl: "/docs",
	i18n,
	icon: createIconComponent,
});

/**
 * Legal pages source loader configuration
 */
export const legalSource = loader({
	source: legal.toFumadocsSource(),
	baseUrl: "/legal",
	i18n,
});
