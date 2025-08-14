import { z } from "zod";

export const BookInput = z.object({
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
});

export type BookInput = z.infer<typeof BookInput>;

export interface Book extends BookInput {
  id: string;
