# Event Architecture

Events are immutable, versioned, idempotent, traceable, and owned by their publishing domain.

`ITEM_SHOP_UPDATED → Wishlist Matcher → Notification Service → User Alert`

`COSMETIC_UPDATED → Search Index → Analytics → Recommendation Engine`
