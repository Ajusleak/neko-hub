import { z } from "zod";

export const CosmeticSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.string(),
  rarity: z.enum(["Uncommon", "Rare", "Epic", "Legendary", "Icon"]),
  series: z.string().optional(),
  set: z.string(),
  price: z.number().int().nonnegative(),
  image: z.string().url(),
  trend: z.number(),
  isNew: z.boolean(),
  shopStatus: z.string(),
});

export type Cosmetic = z.infer<typeof CosmeticSchema>;
export type RequestMeta = { requestId: string; timestamp: string; service: string };
export type ApiSuccess<T> = { success: true; data: T; meta: RequestMeta };
export type CollectionSuccess<T> = ApiSuccess<T[]> & {
  meta: RequestMeta & { page: number; pageSize: number; total: number };
};
export type ApiFailure = {
  success: false;
  error: { code: string; message: string; details?: Record<string, unknown> };
  meta: RequestMeta;
};

export const AiQuerySchema = z.object({ query: z.string().trim().min(3).max(500) });
export type ServiceState = "loading" | "success" | "empty" | "error" | "offline" | "rate-limited" | "stale";
