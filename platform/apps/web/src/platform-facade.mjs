/**
 * Framework-neutral web application composition facade.
 * A concrete web framework can bind loaders/actions/components to this API later.
 */
export class NeikosHubWebFacade {
  constructor({ identity, catalog, locker, collections, wishlist, search, events }) {
    Object.assign(this, { identity, catalog, locker, collections, wishlist, search, events });
  }

  async home(requestContext, { query = '' } = {}) {
    const auth = await this.identity.resolve(requestContext);
    const userId = auth.subject;
    const [searchResults, lockerItems, collectionItems, wishlistItems] = await Promise.all([
      query ? this.search.search(query) : [],
      userId ? this.locker.list(userId) : [],
      userId ? this.collections.list(userId) : [],
      userId ? this.wishlist.list(userId) : []
    ]);
    return { auth, query, searchResults, lockerItems, collectionItems, wishlistItems };
  }

  async addLockerItem(requestContext, itemId) {
    const auth = await this.identity.authorize(requestContext, ['locker:write']);
    const record = await this.locker.add(auth.subject, itemId);
    if (this.events) await this.events.publish('locker.item.added', { itemId }, { producer: 'web', subject: auth.subject });
    return record;
  }

  async addWishlistItem(requestContext, itemId, metadata = {}) {
    const auth = await this.identity.authorize(requestContext, ['wishlist:write']);
    const record = await this.wishlist.add(auth.subject, itemId, metadata);
    if (this.events) await this.events.publish('wishlist.item.added', { itemId }, { producer: 'web', subject: auth.subject });
    return record;
  }
}
