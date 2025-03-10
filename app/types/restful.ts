import type { z } from "zod";

export type UrlAndBodySchemas = {
  url?: z.ZodSchema;
  body?: z.ZodSchema;
};

export type TOption = {
  isPublic?: boolean;
  isPresentationMode?: boolean;
  perm?: string;
  schemas?: UrlAndBodySchemas;
  handler?: () => any;
};

export type Op = {
  GET?: TOption;
  DELETE?: TOption;
  PUT?: TOption;
  POST?: TOption;
  PATCH?: TOption;
};
