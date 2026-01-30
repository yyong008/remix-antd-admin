import { legalSource } from "~/libs/fumadocs/source";
import type { Root } from "fumadocs-core/page-tree";

/**
 * Get legal page data
 * @param params - Route parameters
 * @param params.params - Parameters object
 * @param params.params.locale - Optional locale
 * @param params.params.legal - Legal page path
 * @returns Legal page data with page and tree
 */
export const getLegalData = async ({ params }: { params: { locale?: string; legal: string } }) => {
  const locale = params.locale;
  const legal = params.legal;
  const slugs = legal ? legal.split("/") : [];
  const page = legalSource.getPage(slugs, locale);

  if (!page) {
    throw new Error("Page not found");
  }

  return {
    page: page,
    tree: legalSource.getPageTree(locale) as Root,
  };
};

export const getPrivacyPolicyData = async ({ params }: { params: { locale?: string } }) => {
  return getLegalData({ params: { ...params, legal: "privacy-policy" } });
};

export const getTermsOfServiceData = async ({ params }: { params: { locale?: string } }) => {
  return getLegalData({ params: { ...params, legal: "terms-of-service" } });
};

export const getCookiePolicyData = async ({ params }: { params: { locale?: string } }) => {
  return getLegalData({ params: { ...params, legal: "cookie-policy" } });
};

export const getLicenseData = async ({ params }: { params: { locale?: string } }) => {
  return getLegalData({ params: { ...params, legal: "license" } });
};
