/** Nominal identifiers used across provider-neutral NEIKOS contracts. */
export type Brand<T, B extends string> = T & { readonly __brand: B };
export type UserId = Brand<string, "UserId">;
export type AccountId = Brand<string, "AccountId">;
export type RequestId = Brand<string, "RequestId">;
export type CorrelationId = Brand<string, "CorrelationId">;
export type EventId = Brand<string, "EventId">;
export type AssetId = Brand<string, "AssetId">;
export type CollectionId = Brand<string, "CollectionId">;
export type WishlistId = Brand<string, "WishlistId">;
export type LockerItemId = Brand<string, "LockerItemId">;
export type FortniteAccountId = Brand<string, "FortniteAccountId">;
export type ISODateTime = Brand<string, "ISODateTime">;
