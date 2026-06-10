import { z } from "zod";

export async function structuredOutput<T>(schema: z.ZodSchema<T>, mock: T): Promise<T> {
  return schema.parse(mock);
}
