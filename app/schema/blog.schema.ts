import { z } from "zod";

/*---------------------dir: add/update--------------------------*/
export const CreateBlogCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});
