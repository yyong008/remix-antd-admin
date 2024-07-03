import { z } from "zod";

export const basePage = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});
