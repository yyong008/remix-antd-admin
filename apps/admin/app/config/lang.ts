export const langs = ["en", "zh"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = langs[0];
