export interface CosmeticItem {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly rarity?: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly source?: string;
  readonly tags?: readonly string[];
}

export interface OwnedCosmetic {
  readonly itemId: string;
  readonly acquiredAt?: string;
  readonly favorite?: boolean;
}
