import { z } from "zod";

export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 1))
    .refine((val) => Number.isInteger(val) && val >= 1, {
      message: "page deve ser um número inteiro maior ou igual a 1",
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : 10))
    .refine(
      (val) => Number.isInteger(val) && val >= 1 && val <= 50,
      {
        message: "limit deve ser um número inteiro entre 1 e 50",
      }
    ),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
