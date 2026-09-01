import {
  AiQuerySchema,
  CosmeticSchema,
  type ApiSuccess,
  type CollectionSuccess,
  type Cosmetic,
} from "./contracts";
const meta = (service: string) => ({
  requestId: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  service,
});
const delay = (ms = 240) => new Promise((resolve) => setTimeout(resolve, ms));
export const mockAdapter = {
  async listCosmetics(
    query = "",
    type = "mixed",
  ): Promise<CollectionSuccess<Cosmetic>> {
    const response = await fetch(
      `/api/cosmetics?type=${encodeURIComponent(type)}&q=${encodeURIComponent(query)}&limit=72`,
    );
    if (!response.ok) throw new Error("Cosmetics are temporarily unavailable.");
    const payload = (await response.json()) as {
      data: Cosmetic[];
      total: number;
    };
    const parsed = payload.data.map((item) => CosmeticSchema.parse(item));
    return {
      success: true,
      data: parsed,
      meta: {
        ...meta("fortnite-data"),
        page: 1,
        pageSize: 30,
        total: payload.total,
      },
    };
  },
  async getLocker(): Promise<
    ApiSuccess<{
      total: number;
      favorites: number;
      wishlist: number;
      completion: number;
    }>
  > {
    await delay();
    return {
      success: true,
      data: { total: 847, favorites: 32, wishlist: 18, completion: 68 },
      meta: meta("locker"),
    };
  },
  async notifications() {
    await delay();
    const data = [
      {
        id: "n1",
        title: "Wishlist match",
        detail: "Breakpoint is back",
        category: "Shop",
        unread: true,
      },
    ];
    return {
      success: true as const,
      data,
      meta: {
        ...meta("notifications"),
        page: 1,
        pageSize: 20,
        total: data.length,
      },
    };
  },
  async aiQuery(input: string) {
    const { query } = AiQuerySchema.parse({ query: input });
    await delay(650);
    return {
      success: true as const,
      data: {
        answer: `A strong match for “${query}” is waiting in the live catalog. Compare its set, rarity, and return history before adding it.`,
        sources: ["Live cosmetic catalog", "Trend index"],
      },
      meta: meta("ai"),
    };
  },
};
