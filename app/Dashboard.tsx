"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  Bell,
  Bot,
  Boxes,
  ChevronDown,
  Crown,
  Home,
  Newspaper,
  PackageOpen,
  Plus,
  Search,
  Shirt,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { api, errorMessage } from "../lib/api/client";
import type { Cosmetic } from "../lib/api/contracts";
import { SPRITE_FAMILIES, type SpriteFamily } from "./spriteCatalog";

function SpriteIcon() {
  return (
    <img
      className="nav-sprite-icon"
      src="/sprite-nav-3d.png"
      alt=""
      aria-hidden="true"
    />
  );
}

const nav = [
  ["Overview", <Home key="home" />],
  ["Cosmetics", <Shirt key="cosmetics" />],
  ["Item Shop", <ShoppingBag key="shop" />],
  ["Locker", <PackageOpen key="locker" />],
  ["Collections", <Boxes key="collections" />],
  ["Sprites", <SpriteIcon key="sprites" />],
  ["AI Intelligence", <Sparkles key="ai" />],
  ["News & Updates", <Newspaper key="news" />],
  ["About", <UserRound key="about" />],
] as const;
const overviewLinks = [
  ["Cosmetics", "COSMETIC CATALOG", "Browse every Fortnite cosmetic", "#38bdf8"],
  ["Item Shop", "LIVE ITEM SHOP", "Explore today’s Fortnite offers", "#f6a63a"],
  ["Locker", "YOUR LOCKER", "Build and review your loadouts", "#42d6aa"],
  ["Collections", "SAVED COSMETICS", "View favorites and your watchlist", "#8d7cff"],
  ["Sprites", "SPRITE MASTERY", "Track Sprite variants and levels", "#d8e4f2"],
  ["AI Intelligence", "NEKO AI", "View the intelligence preview", "#ee58bd"],
  ["News & Updates", "FORTNITE NEWS", "Read the latest live updates", "#ff6e66"],
  ["About", "ABOUT NEKO HUB", "Learn more about the platform", "#6f91ff"],
] as const;
const categories = [
  ["mixed", "All"],
  ["outfit", "Outfits"],
  ["backbling", "Back Blings"],
  ["pickaxe", "Pickaxes"],
  ["glider", "Gliders"],
  ["emote", "Emotes"],
  ["wrap", "Wraps"],
  ["contrail", "Contrails"],
  ["music", "Music"],
  ["loadingscreen", "Loading Screens"],
];
const shuffleTypes = [
  ["outfit", "Outfit"],
  ["backbling", "Back Bling"],
  ["pickaxe", "Pickaxe"],
  ["glider", "Glider"],
  ["emote", "Emote"],
  ["wrap", "Wrap"],
];
type User = { id: string; username: string; email: string; provider: string };
type ShopItem = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  regularPrice: number;
  section: string;
  sectionRank: number;
  sectionPriority?: number;
  isBundle: boolean;
  isNew: boolean;
  sortPriority: number;
  rarity: string;
  itemCount: number;
  giftable: boolean;
  wide: boolean;
  colors?: { color1?: string; color2?: string; color3?: string };
  outDate: string | null;
  officialUrl?: string | null;
};

const SHOP_RARITY_COLORS: Record<string, [string, string]> = {
  legendary: ["#d88724", "#71370e"],
  epic: ["#9b4acb", "#4a246f"],
  rare: ["#2997d6", "#12528b"],
  uncommon: ["#42a75c", "#17643a"],
  common: ["#74818f", "#36414d"],
  shop: ["#168f89", "#075b62"],
};

function shopCardStyle(item: ShopItem) {
  const fallback =
    SHOP_RARITY_COLORS[item.rarity?.toLowerCase()] || SHOP_RARITY_COLORS.shop;
  const asHex = (value: string | undefined, defaultColor: string) => {
    const clean = value?.replace(/^#/, "").slice(0, 6);
    return clean && /^[0-9a-f]{6}$/i.test(clean) ? `#${clean}` : defaultColor;
  };

  return {
    "--shop-a": asHex(item.colors?.color1, fallback[0]),
    "--shop-b": asHex(item.colors?.color3 || item.colors?.color2, fallback[1]),
  } as React.CSSProperties;
}

function shopSectionTier(item: ShopItem) {
  const value = `${item.section} ${item.subtitle}`.toLowerCase();
  // Keep special modes at the end of the combined shop, regardless of the
  // upstream section priority. Their dedicated tabs retain their own contents.
  if ((item.sectionPriority ?? 0) >= 30) return 40;
  if ((item.sectionPriority ?? 0) >= 20) return 30;
  if (/jam|spark\s*track|track|music|festival|instrument/.test(value)) return 40;
  if (/car|vehicle|wheel|decal|rocket\s*racing|octane|suv/.test(value)) return 30;
  if (item.isBundle || /bundle|outfit|skin|emote/.test(value)) return 0;
  if (/back\s*bling|pickaxe|glider|wrap|contrail/.test(value)) return 10;
  return 20;
}
type NewsItem = {
  id: string;
  section: "Battle Royale" | "Save the World";
  title: string;
  body: string;
  imageUrl: string;
  date: string;
  priority: number;
};

export default function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null),
    storageReady = useRef(false);
  const [active, setActive] = useState("Overview"),
    [category, setCategory] = useState("mixed"),
    [items, setItems] = useState<Cosmetic[]>([]),
    [loading, setLoading] = useState(true),
    [query, setQuery] = useState(""),
    [catalogTotal, setCatalogTotal] = useState(0);
  const [favorites, setFavorites] = useState(new Set<string>()),
    [wishlist, setWishlist] = useState(new Set<string>()),
    [owned, setOwned] = useState(new Set<string>()),
    [sort, setSort] = useState("Newest"),
    [selected, setSelected] = useState<Cosmetic | null>(null),
    [catalogError, setCatalogError] = useState(""),
    [toast, setToast] = useState(""),
    [user, setUser] = useState<User | null>(null),
    [loadout, setLoadout] = useState<Array<{ slot: string; item: Cosmetic }>>(
      [],
    ),
    [shuffling, setShuffling] = useState(false);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]),
    [shopLoading, setShopLoading] = useState(false),
    [shopError, setShopError] = useState(""),
    [shopSection, setShopSection] = useState("All"),
    [selectedShopItem, setSelectedShopItem] = useState<ShopItem | null>(null),
    [news, setNews] = useState<NewsItem[]>([]),
    [newsLoading, setNewsLoading] = useState(false),
    [newsError, setNewsError] = useState(""),
    [newsSection, setNewsSection] = useState("All"),
    [notificationsOpen, setNotificationsOpen] = useState(false),
    [spriteFamilies, setSpriteFamilies] = useState<SpriteFamily[]>(SPRITE_FAMILIES),
    [spriteSource, setSpriteSource] = useState("built-in-fallback"),
    [spriteLevels, setSpriteLevels] = useState<Record<string, number>>({}),
    [spriteFilter, setSpriteFilter] = useState("All"),
    [showShopBackToTop, setShowShopBackToTop] = useState(false),
    [shopThemeColor, setShopThemeColor] = useState("#55317a"),
    [booting, setBooting] = useState(true);
  useEffect(() => {
    let cancelled = false;
    async function refreshSprites() {
      try {
        const response = await fetch("/api/sprites", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { data?: SpriteFamily[]; source?: string };
        if (!cancelled && Array.isArray(payload.data) && payload.data.length) {
          setSpriteFamilies(payload.data);
          setSpriteSource(payload.source || "built-in-fallback");
        }
      } catch {}
    }
    refreshSprites();
    const timer = window.setInterval(refreshSprites, 15 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);
  async function loadCosmetics(type = category, search = query) {
    setLoading(true);
    setCatalogError("");
    try {
      const result = await api.fortnite.items.list(search, type);
      setItems(result.data);
      setCatalogTotal(result.meta.total);
    } catch (issue) {
      const message = errorMessage(issue);
      setCatalogError(message);
      setToast(message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadCosmetics("mixed", "");
    try {
      const saved = (key: string) =>
        new Set<string>(JSON.parse(localStorage.getItem(key) || "[]"));
      setFavorites(saved("neko:favorites"));
      setWishlist(saved("neko:wishlist"));
      setOwned(saved("neko:owned"));
      setSpriteLevels(
        JSON.parse(localStorage.getItem("neko:sprite-levels") || "{}"),
      );
      const requested = decodeURIComponent(location.hash.slice(1)).replaceAll(
        "-",
        " ",
      );
      const match = nav.find(
        ([label]) => label.toLowerCase() === requested.toLowerCase(),
      );
      if (match && match[0] !== "About") setActive(match[0]);
    } catch {}
    storageReady.current = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((r) => setUser(r.user))
      .catch(() => {});
    const bootTimer = window.setTimeout(() => setBooting(false), 2050);
    return () => window.clearTimeout(bootTimer);
  }, []);
  useEffect(() => {
    if (!storageReady.current) return;
    localStorage.setItem("neko:favorites", JSON.stringify([...favorites]));
    localStorage.setItem("neko:wishlist", JSON.stringify([...wishlist]));
    localStorage.setItem("neko:owned", JSON.stringify([...owned]));
  }, [favorites, wishlist, owned]);
  useEffect(() => {
    if (!storageReady.current) return;
    localStorage.setItem("neko:sprite-levels", JSON.stringify(spriteLevels));
  }, [spriteLevels]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setSelected(null);
        setNotificationsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (active !== "Item Shop") {
      setShowShopBackToTop(false);
      return;
    }
    const updateBackToTop = () =>
      setShowShopBackToTop(window.scrollY >= window.innerHeight * 2);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);
    return () => {
      window.removeEventListener("scroll", updateBackToTop);
      window.removeEventListener("resize", updateBackToTop);
    };
  }, [active]);
  useEffect(() => {
    if (active !== "Cosmetics") return;
    const timer = window.setTimeout(
      () => loadCosmetics(category, query),
      query ? 350 : 0,
    );
    return () => window.clearTimeout(timer);
  }, [query, active]);
  useEffect(() => {
    if (
      active === "Item Shop" &&
      !shopItems.length &&
      !shopLoading &&
      !shopError
    ) {
      setShopLoading(true);
      fetch("/api/shop")
        .then(async (response) => {
          const result = await response.json();
          if (!response.ok)
            throw new Error(result.error || "Item Shop unavailable");
          setShopItems(result.entries || []);
        })
        .catch((issue) => setShopError(errorMessage(issue)))
        .finally(() => setShopLoading(false));
    }
    if (
      active === "News & Updates" &&
      !news.length &&
      !newsLoading &&
      !newsError
    ) {
      setNewsLoading(true);
      fetch("/api/news")
        .then(async (response) => {
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || "News unavailable");
          setNews(result.data || []);
        })
        .catch((issue) => setNewsError(errorMessage(issue)))
        .finally(() => setNewsLoading(false));
    }
  }, [
    active,
    shopItems.length,
    shopLoading,
    shopError,
    news.length,
    newsLoading,
    newsError,
  ]);
  const visible = useMemo(() => {
    const list = items.filter(
      (i) =>
        `${i.name} ${i.rarity} ${i.set} ${i.type} ${i.shopStatus}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (active !== "Collections" ||
          favorites.has(i.id) ||
          wishlist.has(i.id)),
    );
    if (sort === "Name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Rarity")
      list.sort(
        (a, b) =>
          ["Legendary", "Epic", "Rare", "Uncommon"].indexOf(a.rarity) -
          ["Legendary", "Epic", "Rare", "Uncommon"].indexOf(b.rarity),
      );
    return list;
  }, [items, query, sort, active, favorites, wishlist]);
  const shopGroups = useMemo(() => {
    const filtered = shopItems.filter(
      (item) =>
        (shopSection === "All" || item.section === shopSection) &&
        (!query.trim() ||
          `${item.name} ${item.subtitle} ${item.rarity} ${item.section}`
            .toLowerCase()
            .includes(query.trim().toLowerCase())),
    );
    const grouped = new Map<string, ShopItem[]>();
    for (const item of filtered) {
      const group = grouped.get(item.section) || [];
      group.push(item);
      grouped.set(item.section, group);
    }
    return [...grouped.entries()]
      .map(([section, entries]) => ({
        section,
        tier: Math.min(...entries.map(shopSectionTier)),
        priority: Math.min(...entries.map((item) => item.sortPriority)),
        rank: Math.min(...entries.map((item) => item.sectionRank)),
        entries: entries.sort(
          (a, b) =>
            a.sortPriority - b.sortPriority ||
            Number(b.isBundle) - Number(a.isBundle) ||
            a.name.localeCompare(b.name),
        ),
      }))
      .sort(
        (a, b) =>
          a.tier - b.tier ||
          a.priority - b.priority ||
          a.rank - b.rank,
      );
  }, [shopItems, shopSection, query]);
  useEffect(() => {
    if (active !== "Item Shop" || shopSection !== "All") return;
    let frame = 0;
    const updateShopTheme = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const groups = Array.from(
          document.querySelectorAll<HTMLElement>(".shop-group[data-shop-color]"),
        );
        if (!groups.length) return;
        const boundary = window.innerHeight * 0.42;
        let current = groups[0];
        for (const group of groups) {
          if (group.getBoundingClientRect().top <= boundary) current = group;
          else break;
        }
        const nextColor = current.dataset.shopColor;
        if (nextColor) setShopThemeColor(nextColor);
      });
    };
    updateShopTheme();
    window.addEventListener("scroll", updateShopTheme, { passive: true });
    window.addEventListener("resize", updateShopTheme);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateShopTheme);
      window.removeEventListener("resize", updateShopTheme);
    };
  }, [active, shopSection, shopGroups]);
  const availableSprites = useMemo(
    () =>
      spriteFamilies.flatMap((family) =>
        family.variants
          .filter((variant) => variant.availability === "available")
          .map((variant) => ({ family, variant })),
      ),
    [spriteFamilies],
  );
  const spriteMetrics = useMemo(() => {
    const ownedSprites = availableSprites.filter(
      ({ variant }) => (spriteLevels[variant.id] || 0) > 0,
    );
    const mastered = ownedSprites.filter(
      ({ variant }) => spriteLevels[variant.id] === 5,
    );
    const levelTotal = ownedSprites.reduce(
      (total, { variant }) => total + spriteLevels[variant.id],
      0,
    );
    return {
      total: availableSprites.length,
      owned: ownedSprites.length,
      mastered: mastered.length,
      completion: availableSprites.length
        ? Math.round((ownedSprites.length / availableSprites.length) * 100)
        : 0,
      mastery: availableSprites.length
        ? Math.round((mastered.length / availableSprites.length) * 100)
        : 0,
      average: ownedSprites.length
        ? (levelTotal / ownedSprites.length).toFixed(1)
        : "0.0",
    };
  }, [availableSprites, spriteLevels]);
  const visibleSpriteFamilies = useMemo(() => {
    const term = query.trim().toLowerCase();
    return spriteFamilies.filter((family) => {
      const levels = family.variants
        .filter((variant) => variant.availability === "available")
        .map((variant) => spriteLevels[variant.id] || 0);
      const matchesFilter =
        spriteFilter === "All" ||
        (spriteFilter === "Owned" && levels.some((level) => level > 0)) ||
        (spriteFilter === "Mastered" && levels.some((level) => level === 5)) ||
        (spriteFilter === "Missing" && levels.some((level) => level === 0));
      const matchesSearch =
        !term ||
        `${family.name} ${family.element} ${family.rarity} ${family.ability} ${family.variants.map((variant) => variant.name).join(" ")}`
          .toLowerCase()
          .includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [query, spriteFilter, spriteLevels, spriteFamilies]);
  const orderedShopSections = useMemo(() => {
    const sections = new Map<
      string,
      { tier: number; priority: number; rank: number }
    >();
    for (const item of shopItems) {
      const current = sections.get(item.section);
      const next = {
        tier: shopSectionTier(item),
        priority: item.sortPriority,
        rank: item.sectionRank,
      };
      if (
        !current ||
        next.tier < current.tier ||
        (next.tier === current.tier && next.priority < current.priority) ||
        (next.tier === current.tier &&
          next.priority === current.priority &&
          next.rank < current.rank)
      )
        sections.set(item.section, next);
    }
    return [...sections.entries()]
      .sort(
        ([, a], [, b]) =>
          a.tier - b.tier ||
          a.priority - b.priority ||
          a.rank - b.rank,
      )
      .map(([section]) => section);
  }, [shopItems]);
  function changeCategory(next: string) {
    if (next === category) return;
    setCategory(next);
    loadCosmetics(next);
  }
  function searchCatalog(value: string) {
    setQuery(value);
    if (
      active !== "Cosmetics" &&
      active !== "Discover" &&
      active !== "Item Shop" &&
      active !== "Sprites"
    )
      go("Cosmetics");
  }
  function go(label: string) {
    if (label === "Profile") {
      window.location.href = "/profile";
      return;
    }
    if (label === "About") {
      window.location.href = "/about";
      return;
    }
    setActive(label);
    history.replaceState(
      null,
      "",
      `#${label.toLowerCase().replaceAll(" ", "-")}`,
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function toggle(kind: "fav" | "wish", id: string) {
    const current = kind === "fav" ? favorites : wishlist,
      next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    kind === "fav" ? setFavorites(next) : setWishlist(next);
    setToast(
      next.has(id)
        ? `Added to ${kind === "fav" ? "favorites" : "wishlist"}`
        : "Removed",
    );
    setTimeout(() => setToast(""), 1600);
  }
  function toggleOwned(id: string) {
    const next = new Set(owned);
    next.has(id) ? next.delete(id) : next.add(id);
    setOwned(next);
    setToast(
      next.has(id)
        ? "Added to your collection"
        : "Removed from your collection",
    );
    setTimeout(() => setToast(""), 1600);
  }
  async function shuffleLocker() {
    setShuffling(true);
    setLoadout([]);
    try {
      const results = await Promise.all(
        shuffleTypes.map(async ([type, slot]) => {
          const result = await api.fortnite.items.list("", type);
          return {
            slot,
            item: result.data[Math.floor(Math.random() * result.data.length)],
          };
        }),
      );
      setLoadout(results.filter((x) => x.item));
    } catch (issue) {
      setToast(errorMessage(issue));
    } finally {
      setShuffling(false);
    }
  }
  function fortniteOfferUrl(item: ShopItem) {
    const destination = new URL(
      item.officialUrl || "https://www.fortnite.com/item-shop",
    );
    destination.searchParams.set("creator-code", "neikos");
    return destination.toString();
  }
  function selectShopItem(item: ShopItem) {
    setSelectedShopItem(item);
  }
  function setSpriteLevel(variantId: string, level: number) {
    const safeLevel = Math.max(0, Math.min(5, Math.round(level)));
    setSpriteLevels((current) => {
      const next = { ...current };
      if (safeLevel === 0) delete next[variantId];
      else next[variantId] = safeLevel;
      return next;
    });
    setToast(
      safeLevel === 5
        ? "Sprite mastered"
        : safeLevel > 0
          ? `Sprite updated to level ${safeLevel}`
          : "Sprite marked missing",
    );
  }
  const initials = (user?.username || "Guest").slice(0, 2).toUpperCase();
  return (
    <div className="shell">
      {booting && (
        <div
          className="boot-screen"
          role="status"
          aria-label="Loading Neko Hub"
        >
          <div className="boot-energy">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="boot-lockup">
            <div className="boot-fox fox-idle">🦊</div>
            <strong>NEKO HUB</strong>
          </div>
        </div>
      )}
      <aside>
        <button className="brand" onClick={() => setActive("Overview")}>
          <i className="fox-idle">🦊</i>
          <span>
            <b>NEKO HUB</b>
            <small>FORTNITE INTELLIGENCE</small>
          </span>
        </button>
        <nav>
          {nav.map(([label, icon]) => (
            <button
              key={label}
              className={active === label ? "active" : ""}
              onClick={() => go(label)}
              title={label}
            >
              <span>{icon}</span>
              <b>{label}</b>
            </button>
          ))}
        </nav>
        <div className="aside-foot">
          <div className="status">
            <i></i>
            <span>
              <b>All systems operational</b>
              <small>Live catalog connected</small>
            </span>
          </div>
          <button className="person" onClick={() => go("Profile")}>
            <i>{initials}</i>
            <span>
              <b>{user?.username || "Guest collector"}</b>
              <small>{user ? "Collector profile" : "Sign in to sync"}</small>
            </span>
            <b>›</b>
          </button>
        </div>
      </aside>
      <main>
        <header>
          <button
            className="mini-brand fox-idle"
            onClick={() => setActive("Overview")}
          >
            🦊
          </button>
          <label className="search">
            <span>⌕</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => searchCatalog(e.target.value)}
              placeholder={
                active === "Item Shop"
                  ? "Search today's Item Shop…"
                  : "Search cosmetics, sets, rarities…"
              }
            />
            {query && (
              <button
                className="search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <kbd>⌘ K</kbd>
          </label>
          <div className="notification-control">
            <button
              className="bell"
              aria-label="Open notifications"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen((open) => !open)}
            >
              <Bell size={18} />
            </button>
            {notificationsOpen && (
              <div className="notification-popover">
                <small>UPDATES</small>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                >
                  ×
                </button>
                <div className="notification-empty">
                  <Bell size={24} />
                  <b>You&apos;re all caught up.</b>
                  <p>There are no updates right now.</p>
                </div>
              </div>
            )}
          </div>
          {user ? (
            <button className="avatar" onClick={() => go("Profile")}>
              {initials}
            </button>
          ) : (
            <div className="auth-actions">
              <a href="/login">Log In</a>
              <a href="/login?mode=signup">Sign Up</a>
            </div>
          )}
        </header>
        <div className="content">
          <section className="welcome">
            <div>
              <small>LIVE FORTNITE INTELLIGENCE</small>
              <h1>
                {active === "Overview" ? (
                  <>
                    Welcome to <b>Neko Hub.</b>
                  </>
                ) : (
                  active
                )}
              </h1>
              <p>
                {active === "Overview"
                  ? "Fortnite intelligence in one place. Explore cosmetics, view the Item Shop, manage your locker, and track your Sprites."
                  : active === "Cosmetics"
                    ? "Search any Fortnite cosmetic."
                    : active === "Sprites"
                      ? "Track every available Sprite variant from discovery to mastery."
                    : active === "Collections"
                      ? "View the cosmetics you have favorited or added to your watchlist."
                    : active === "AI Intelligence"
                      ? "Neko AI is currently in development."
                      : `Tools and live data for ${active.toLowerCase()}.`}
              </p>
            </div>
            <div className="live-data">
              <i></i>LIVE DATA <span>Fortnite-API</span>
            </div>
          </section>
          {active === "Overview" && (
            <>
              <section className="overview-hero">
                <div className="overview-hero-copy">
                  <small>YOUR FORTNITE COLLECTION, UNDERSTOOD</small>
                  <h2>Fortnite intelligence<br/><b>built around you.</b></h2>
                  <p>Explore cosmetics, view the Item Shop, manage your locker, track your Sprites, and preview Neko AI from one connected hub.</p>
                  <div className="overview-hero-actions">
                    <button onClick={() => go("Cosmetics")}>Explore live catalog</button>
                    <button onClick={shuffleLocker}>Shuffle your locker ↻</button>
                  </div>
                  <span className="overview-hero-status"><i /> Live Fortnite data · {catalogTotal.toLocaleString()} cosmetics loaded</span>
                </div>
                <div className="overview-card-stack" aria-label="Featured cosmetics">
                  {items.slice(0, 3).map((item, index) => (
                    <button key={item.id} onClick={() => setSelected(item)} style={{ "--stack-index": index } as React.CSSProperties}>
                      <img src={item.image} alt={item.name} />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </section>
              <section className="metrics">
                {[
                  ["▦", "CATALOG", "ALL TYPES", "Live cosmetics", "pink"],
                  ["♙", "LOCKER", "BUILD", "Shuffle-ready", "cyan"],
                  [
                    "◇",
                    "COLLECTION",
                    `${owned.size}`,
                    "Cosmetics owned",
                    "violet",
                  ],
                  [
                    "♡",
                    "WATCHLIST",
                    `${wishlist.size}`,
                    "Items watched",
                    "amber",
                  ],
                ].map(([icon, label, number, sub, color]) => (
                  <article key={label}>
                    <i className={color}>{icon}</i>
                    <span>
                      <small>{label}</small>
                      <b>{number}</b>
                      <em>{sub}</em>
                    </span>
                  </article>
                ))}
              </section>
              <section className="overview-section-links" aria-label="Neko Hub sections">
                {overviewLinks.map(([label, eyebrow, description, accent]) => {
                  const icon = nav.find(([navLabel]) => navLabel === label)?.[1];
                  return (
                    <button
                      key={label}
                      onClick={() => go(label)}
                      style={{ "--overview-accent": accent } as React.CSSProperties}
                    >
                      <span className="overview-link-icon">{icon}</span>
                      <span className="overview-link-copy">
                        <small>{eyebrow}</small>
                        <b>{description}</b>
                      </span>
                      <em>Open →</em>
                    </button>
                  );
                })}
              </section>
            </>
          )}
          {(active === "Cosmetics" ||
            active === "Collections") && (
            <section className="catalog-tools">
              <div className="category-tabs">
                {categories.map(([key, label]) => (
                  <button
                    key={key}
                    className={category === key ? "active" : ""}
                    onClick={() => changeCategory(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <label className="catalog-sort">
                Sort
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Newest</option>
                  <option>Name</option>
                  <option>Rarity</option>
                </select>
              </label>
              <span className="catalog-count">
                {active === "Collections"
                  ? `${owned.size} owned`
                  : `${catalogTotal.toLocaleString()} results`}
              </span>
              <button
                className="shuffle-button"
                onClick={shuffleLocker}
                disabled={shuffling}
              >
                ↻ {shuffling ? "Building…" : "Shuffle loadout"}
              </button>
            </section>
          )}
          {loadout.length > 0 &&
            (active === "Overview" ||
              active === "Collections") && (
              <section className="loadout">
                <div className="panel-title">
                  <span className="loadout-copy">
                    <small>LOCKER SHUFFLE</small>
                    <h2>Your locker, remixed.</h2>
                    <p>A fresh six-slot combo from the Fortnite catalog.</p>
                  </span>
                  <button className="loadout-shuffle" onClick={shuffleLocker}>
                    <span>Shuffle again</span><b aria-hidden="true">↻</b>
                  </button>
                </div>
                <div className="loadout-grid">
                  {loadout.map(({ slot, item }) => (
                    <article key={slot}>
                      <small>{slot}</small>
                      <img src={item.image} alt={item.name || `${slot} cosmetic`} />
                      <b>{item.name || `Random ${slot}`}</b>
                      <span>{item.rarity}</span>
                    </article>
                  ))}
                </div>
              </section>
            )}
          {active === "Sprites" && (
            <section className="sprites-view">
              <div className="sprite-summary">
                <div className="sprite-summary-copy">
                  <small>COLLECTION / LEVELS / MASTERY</small>
                  <h2>Sprite tracking.</h2>
                  <p>
                    Keep track of all your Sprites and their levels in one
                    place. Mark what you own, follow every variant, and see your
                    mastery progress at a glance.
                  </p>
                </div>
                <div className="sprite-ring" style={{ "--progress": `${spriteMetrics.mastery * 3.6}deg` } as React.CSSProperties}>
                  <div>
                    <strong>{spriteMetrics.mastery}%</strong>
                    <span>MASTERED</span>
                  </div>
                </div>
              </div>
              <div className="sprite-metrics">
                <article>
                  <small>AVAILABLE</small>
                  <strong>{spriteMetrics.total}</strong>
                  <span>Catalogued variants</span>
                </article>
                <article>
                  <small>OWNED</small>
                  <strong>{spriteMetrics.owned}</strong>
                  <span>{spriteMetrics.completion}% completion</span>
                </article>
                <article>
                  <small>MASTERED</small>
                  <strong>{spriteMetrics.mastered}</strong>
                  <span>Level 5 variants</span>
                </article>
                <article>
                  <small>AVERAGE LEVEL</small>
                  <strong>{spriteMetrics.average}</strong>
                  <span>Across owned Sprites</span>
                </article>
              </div>
              <div className="sprite-controls">
                <div className="sprite-filters" role="group" aria-label="Filter Sprites">
                  {["All", "Owned", "Mastered", "Missing"].map((filter) => (
                    <button
                      key={filter}
                      className={spriteFilter === filter ? "active" : ""}
                      onClick={() => setSpriteFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <span>{visibleSpriteFamilies.length} families</span>
              </div>
              <div className="sprite-grid">
                {visibleSpriteFamilies.map((family) => {
                  const available = family.variants.filter(
                    (variant) => variant.availability === "available",
                  );
                  const ownedCount = available.filter(
                    (variant) => (spriteLevels[variant.id] || 0) > 0,
                  ).length;
                  return (
                    <details
                      className="sprite-card"
                      key={family.id}
                      style={{ "--sprite-accent": family.accent } as React.CSSProperties}
                    >
                      <summary className="sprite-card-summary">
                        <div className="sprite-card-head">
                          <span className="sprite-emblem">
                            <img src={family.image} alt={family.name} loading="lazy" />
                          </span>
                          <div>
                            <small>{family.rarity} · {family.dropRate} drop</small>
                            <h3>{family.name}</h3>
                            <span>{family.ability}</span>
                          </div>
                          <span className="sprite-card-state">
                            <b>{ownedCount}/{available.length}</b>
                            <ChevronDown size={16} />
                          </span>
                        </div>
                        <p>{family.description}</p>
                        <div className="sprite-location">{family.location}</div>
                      </summary>
                      <div className="sprite-card-body">
                        <div className="sprite-variants">
                        {family.variants.map((variant) => {
                          const level = spriteLevels[variant.id] || 0;
                          const trackable = variant.availability === "available";
                          return (
                            <div
                              className={`sprite-variant ${!trackable ? "locked" : ""}`}
                              key={variant.id}
                            >
                              <a className="sprite-variant-info" href={variant.infoUrl} target="_blank" rel="noreferrer">
                                <img src={variant.image} alt={variant.fullName} loading="lazy" />
                                <span>
                                <strong>{variant.name}</strong>
                                <em>
                                  {!trackable
                                    ? variant.availability
                                    : level === 5
                                      ? "Mastered"
                                      : level > 0
                                        ? `Level ${level}`
                                        : "Not owned"}
                                </em>
                                </span>
                              </a>
                              {trackable ? (
                                <div className="level-picker" aria-label={`${variant.name} level`}>
                                  {[1, 2, 3, 4, 5].map((step) => (
                                    <button
                                      key={step}
                                      className={level >= step ? "filled" : ""}
                                      aria-label={`Set ${variant.name} to level ${step}`}
                                      aria-pressed={level === step}
                                      onClick={() =>
                                        setSpriteLevel(
                                          variant.id,
                                          level === step ? 0 : step,
                                        )
                                      }
                                    >
                                      {step}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <span className="variant-lock">LOCKED</span>
                              )}
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </details>
                  );
                })}
                {visibleSpriteFamilies.length === 0 && (
                  <div className="sprite-empty">
                    <Crown size={30} />
                    <strong>No Sprite families match.</strong>
                    <span>Change the filter or clear your search.</span>
                    <button onClick={() => { setSpriteFilter("All"); setQuery(""); }}>
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
              <p className="sprite-source-note">
                {spriteSource === "fortnite.gg" ? "Live Fortnite.GG catalog connected" : "Verified catalog fallback active"}
                {" · "}Automatically checks for new Sprites every 15 minutes. Progress stays on this device.
              </p>
            </section>
          )}
          {active === "Locker" && (
            <section className="original-locker">
              <div className="locker-glow" aria-hidden="true">
                <span>▣</span>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="locker-intro">
                <small>ORIGINAL LOCKER COSMETICS</small>
                <span className="wip-badge">WORK IN PROGRESS</span>
                <h2>
                  Your real Fortnite locker.
                  <br />
                  <em>Connected to Neko Hub.</em>
                </h2>
                <p>
                  This space is being built to let you securely connect your
                  Epic Games account and view the cosmetics owned on your
                  Fortnite account—all organized inside your personal Neko Hub
                  locker.
                </p>
                <div className="locker-steps">
                  <article>
                    <b>01</b>
                    <div>
                      <strong>Connect Epic Games</strong>
                      <span>
                        Authorize your account through Epic&apos;s secure
                        sign-in flow.
                      </span>
                    </div>
                  </article>
                  <article>
                    <b>02</b>
                    <div>
                      <strong>Import owned cosmetics</strong>
                      <span>
                        Match your account inventory with the live Fortnite
                        catalog.
                      </span>
                    </div>
                  </article>
                  <article>
                    <b>03</b>
                    <div>
                      <strong>Explore your collection</strong>
                      <span>
                        Filter, inspect, and build loadouts using cosmetics you
                        own.
                      </span>
                    </div>
                  </article>
                </div>
                <button className="epic-disabled" disabled>
                  <span>E</span>Epic account connection coming soon
                </button>
                <p className="locker-note">
                  No Epic credentials or account data are collected while this
                  feature is in development.
                </p>
              </div>
            </section>
          )}
          {active === "AI Intelligence" && (
            <section className="neko-ai-soon">
              <div className="ai-core" aria-hidden="true">
                <Bot size={86} />
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="ai-soon-copy">
                <small>NEKO AI / INTELLIGENCE ASSISTANT</small>
                <span className="wip-badge">COMING SOON</span>
                <h2>
                  A smarter way to understand <em>your Fortnite world.</em>
                </h2>
                <p>
                  Neko AI is planned as the intelligence layer for cosmetics,
                  collections, shop activity, and loadout ideas. The experience
                  is still being designed, so assistant responses are not active
                  yet.
                </p>
                <div className="ai-preview-grid">
                  <article>
                    <span>CATALOG</span>
                    <b>Cosmetic discovery</b>
                  </article>
                  <article>
                    <span>LOCKER</span>
                    <b>Personal insights</b>
                  </article>
                  <article>
                    <span>LOADOUTS</span>
                    <b>Creative suggestions</b>
                  </article>
                </div>
                <button disabled>
                  <Sparkles size={16} /> Neko AI is in development
                </button>
              </div>
            </section>
          )}
          {active === "Item Shop" && (
            <section
              className={`shop-view ${shopGroups.length ? "shop-view-themed" : ""} ${shopSection !== "All" ? "shop-view-filtered" : ""}`}
              style={
                {
                  "--shop-section-color":
                    shopSection !== "All"
                      ? `#${shopGroups[0]?.entries[0]?.colors?.color1?.slice(0, 6) || "55317a"}`
                      : shopThemeColor,
                } as React.CSSProperties
              }
            >
              <div className="shop-toolbar">
                <div>
                  <small>FORTNITE ITEM SHOP · LIVE ROTATION</small>
                  <h2>Fortnite Item Shop</h2>
                  <p>
                    {shopItems.length
                      ? <><b>{shopItems.length}</b><span> live offers from Fortnite-API</span></>
                      : "Loading today’s rotation…"}
                  </p>
                </div>
                <button
                  className="shop-refresh"
                  onClick={() => {
                    setShopItems([]);
                    setShopError("");
                  }}
                >
                  Refresh shop ↻
                </button>
              </div>
              {shopItems.length > 0 && (
                <div className="shop-sections">
                  {[
                    "All",
                    ...orderedShopSections,
                  ].map((section) => (
                    <button
                      key={section}
                      className={shopSection === section ? "active" : ""}
                      onClick={() => setShopSection(section)}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              )}
              {shopLoading && (
                <div className="shop-grid">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div className="shop-skeleton" key={i} />
                  ))}
                </div>
              )}
              {shopError && (
                <div className="empty">
                  <b>Item Shop could not load.</b>
                  <span>{shopError}</span>
                  <button onClick={() => setShopItems([])}>Try again</button>
                </div>
              )}
              {!shopLoading && !shopError && (
                <div className="shop-groups">
                  {shopGroups.map(({ section, entries }) => (
                    <section
                      className="shop-group"
                      key={section}
                      data-shop-color={`#${entries[0]?.colors?.color1?.slice(0, 6) || "55317a"}`}
                      style={
                        {
                          "--section-a": `#${entries[0]?.colors?.color1?.slice(0, 6) || "c84242"}`,
                          "--section-b": `#${entries[0]?.colors?.color3?.slice(0, 6) || "7d1d29"}`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="shop-group-title">
                        <div>
                          <h3>{section}</h3>
                          {shopSection !== "All" && (
                            <p>Matching cosmetics for {section}</p>
                          )}
                        </div>
                      </div>
                      <div className="shop-row">
                        {entries.map((item) => (
                          <article
                            className={`shop-card ${item.isBundle ? "bundle" : ""} ${item.wide ? "wide" : ""}`}
                            key={item.id}
                            style={shopCardStyle(item)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View purchase options for ${item.name}`}
                            onClick={() => selectShopItem(item)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                selectShopItem(item);
                              }
                            }}
                          >
                            <div className="shop-art">
                              <img
                                loading="lazy"
                                src={item.image}
                                alt={item.name}
                              />
                              {item.isBundle && (
                                <span className="bundle-label">
                                  BUNDLE DEAL
                                </span>
                              )}
                              {item.isNew && !item.isBundle && (
                                <span className="new-label">NEW!</span>
                              )}
                              {!item.isNew &&
                                !item.isBundle &&
                                item.itemCount > 1 && (
                                  <span>{item.itemCount} ITEMS</span>
                                )}
                            </div>
                            <div className="shop-copy">
                              <small>
                                {item.rarity}
                                {item.isBundle ? " · MATCHING SET" : ""}
                              </small>
                              <h3>{item.name}</h3>
                              <p>{item.subtitle}</p>
                              <div>
                                <b>
                                  <i>V</i>
                                  {item.price > 0
                                    ? item.price.toLocaleString()
                                    : "—"}
                                </b>
                                {item.regularPrice > item.price && (
                                  <del>
                                    {item.regularPrice.toLocaleString()}
                                  </del>
                                )}
                                <button
                                  className="shop-add"
                                  aria-label={`View ${item.name} in the Fortnite Item Shop`}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    selectShopItem(item);
                                  }}
                                >
                                  <Plus />
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  ))}
                  {shopGroups.length === 0 && query.trim() && (
                    <div className="shop-search-empty">
                      <b>No matching shop offers.</b>
                      <span>Try another item, set, rarity, or section.</span>
                      <button onClick={() => setQuery("")}>Clear search</button>
                    </div>
                  )}
                </div>
              )}
              {showShopBackToTop && shopSection === "All" && shopGroups.length > 0 && (
                <button
                  className="shop-back-to-top"
                  onClick={(event) =>
                    event.currentTarget
                      .closest(".shop-view")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  <span>Back to top</span>
                  <ArrowUp aria-hidden="true" />
                </button>
              )}
            </section>
          )}
          {active === "News & Updates" && (
            <section className="news-view">
              <div className="news-toolbar">
                <div>
                  <small>LIVE FORTNITE FEED</small>
                  <h2>News &amp; Updates</h2>
                  <p>
                    Battle Royale and Save the World announcements from
                    Fortnite-API.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNews([]);
                    setNewsError("");
                  }}
                >
                  Refresh news ↻
                </button>
              </div>
              <div className="news-tabs">
                {["All", "Battle Royale", "Save the World"].map((section) => (
                  <button
                    key={section}
                    className={newsSection === section ? "active" : ""}
                    onClick={() => setNewsSection(section)}
                  >
                    {section}
                  </button>
                ))}
              </div>
              {newsLoading && (
                <div className="news-grid-new">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div className="news-skeleton" key={i} />
                  ))}
                </div>
              )}
              {newsError && (
                <div className="empty">
                  <b>News feed unavailable.</b>
                  <span>{newsError}</span>
                  <button onClick={() => setNews([])}>Try again</button>
                </div>
              )}
              {!newsLoading && !newsError && (
                <div className="news-grid-new">
                  {news
                    .filter(
                      (item) =>
                        newsSection === "All" || item.section === newsSection,
                    )
                    .map((item, index) => (
                      <article
                        className={
                          index === 0 && newsSection !== "Save the World"
                            ? "news-lead"
                            : "news-tile"
                        }
                        key={item.id}
                      >
                        <img loading="lazy" src={item.imageUrl} alt="" />
                        <div>
                          <small>{item.section}</small>
                          <h3>{item.title}</h3>
                          <p>{item.body}</p>
                          <time className="news-date" dateTime={item.date}>
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>
                      </article>
                    ))}
                </div>
              )}
            </section>
          )}
          {active !== "Item Shop" &&
            active !== "News & Updates" &&
            active !== "Locker" &&
            active !== "Overview" &&
            active !== "Discover" &&
            active !== "Sprites" &&
            active !== "AI Intelligence" && (
              <>
                <section className="section-head">
                  <div>
                    <small>DISCOVER NOW</small>
                    <h2>
                      {active === "Collections"
                        ? "Your favorites & watchlist"
                        : category === "mixed"
                          ? "Fresh from every category"
                          : categories.find((x) => x[0] === category)?.[1]}
                    </h2>
                  </div>
                  <div>
                    <button onClick={() => loadCosmetics(category)}>
                      Refresh ↻
                    </button>
                  </div>
                </section>
                <section className="cosmetic-grid">
                  {loading &&
                    Array.from({ length: 12 }, (_, i) => (
                      <div className="skeleton" key={i} />
                    ))}
                  {catalogError && (
                    <div className="empty">
                      <b>Cosmetics could not load.</b>
                      <span>{catalogError}</span>
                      <button onClick={() => loadCosmetics(category)}>
                        Try again
                      </button>
                    </div>
                  )}
                  {!loading && !catalogError && visible.length === 0 && (
                    <div className="empty">
                      <b>
                        {active === "Collections"
                          ? "No saved cosmetics yet."
                          : "No cosmetics found."}
                      </b>
                      <span>
                        {active === "Collections"
                          ? "Favorite an item or add it to your watchlist and it will appear here."
                          : "Try another category or search."}
                      </span>
                      <button
                        className={active === "Collections" ? "browse-cosmetics-cta" : ""}
                        onClick={() =>
                          active === "Collections"
                            ? go("Cosmetics")
                            : setQuery("")
                        }
                      >
                        {active === "Collections"
                          ? "BROWSE COSMETICS"
                          : "Clear search"}
                      </button>
                    </div>
                  )}
                  {!loading &&
                    !catalogError &&
                    visible.map((item) => (
                      <article
                        className={`cosmetic-card rarity-${item.rarity.toLowerCase()}`}
                        key={item.id}
                      >
                        <button
                          className="card-visual"
                          onClick={() => setSelected(item)}
                          aria-label={`Open ${item.name}`}
                        >
                          <img
                            loading="lazy"
                            src={item.image}
                            alt={item.name}
                          />
                          <span className="rarity-badge">{item.rarity}</span>
                          {owned.has(item.id) && (
                            <span className="owned-badge">OWNED</span>
                          )}
                        </button>
                        <div className="card-copy">
                          <small>
                            {item.type}
                            {item.series ? ` / ${item.series}` : ""}
                          </small>
                          <button
                            className="card-name"
                            onClick={() => setSelected(item)}
                          >
                            {item.name}
                          </button>
                          <p>{item.set}</p>
                        </div>
                        <div className="card-actions">
                          <button
                            className={owned.has(item.id) ? "selected" : ""}
                            onClick={() => toggleOwned(item.id)}
                          >
                            {owned.has(item.id) ? "Owned" : "+ Collection"}
                          </button>
                          <button
                            className={favorites.has(item.id) ? "selected" : ""}
                            onClick={() => toggle("fav", item.id)}
                          >
                            {favorites.has(item.id) ? "Favorited" : "Favorite"}
                          </button>
                          <button
                            className={wishlist.has(item.id) ? "selected" : ""}
                            onClick={() => toggle("wish", item.id)}
                          >
                            {wishlist.has(item.id) ? "Watching" : "Watch"}
                          </button>
                        </div>
                      </article>
                    ))}
                </section>
              </>
            )}
        </div>
      </main>
      {selected && (
        <>
          <button
            className="modal-backdrop"
            onClick={() => setSelected(null)}
            aria-label="Close cosmetic details"
          />
          <aside className="detail-panel">
            <header>
              <span>
                {selected.type} · {selected.rarity}
              </span>
              <button onClick={() => setSelected(null)}>Close ✕</button>
            </header>
            <div className="detail-image">
              <img src={selected.image} alt={selected.name} />
            </div>
            <small>{selected.series || "FORTNITE COSMETIC"}</small>
            <h2>{selected.name}</h2>
            <p>{selected.shopStatus}</p>
            <dl>
              <div>
                <dt>Type</dt>
                <dd>{selected.type}</dd>
              </div>
              <div>
                <dt>Rarity</dt>
                <dd>{selected.rarity}</dd>
              </div>
              <div>
                <dt>Set</dt>
                <dd>{selected.set}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{selected.isNew ? "Recently added" : "Live catalog"}</dd>
              </div>
            </dl>
            <div className="detail-actions">
              <button onClick={() => toggleOwned(selected.id)}>
                {owned.has(selected.id)
                  ? "Remove from collection"
                  : "Add to collection"}
              </button>
              <button onClick={() => toggle("wish", selected.id)}>
                {wishlist.has(selected.id) ? "Remove watch" : "Watch item"}
              </button>
            </div>
          </aside>
        </>
      )}
      {selectedShopItem && (
        <>
          <button
            className="purchase-backdrop"
            onClick={() => setSelectedShopItem(null)}
            aria-label="Cancel and close purchase confirmation"
          />
          <section
            className="purchase-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-title"
          >
            <button
              className="purchase-close"
              onClick={() => setSelectedShopItem(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div
              className="purchase-art"
              style={shopCardStyle(selectedShopItem)}
            >
              <img src={selectedShopItem.image} alt={selectedShopItem.name} />
            </div>
            <small>FORTNITE ITEM SHOP</small>
            <h2 id="purchase-title">Purchase {selectedShopItem.name}?</h2>
            <p>
              Continue to the official Fortnite Item Shop to review this offer
              and complete your purchase with creator code <b>NEIKOS</b>.
            </p>
            <div className="purchase-price">
              <span>Current price</span>
              <b><i>V</i>{selectedShopItem.price > 0 ? selectedShopItem.price.toLocaleString() : "View offer"}</b>
            </div>
            <p className="purchase-security">
              Payment and account details are handled only by Epic Games.
            </p>
            <div className="purchase-actions">
              <button onClick={() => setSelectedShopItem(null)}>Cancel</button>
              <a
                href={fortniteOfferUrl(selectedShopItem)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedShopItem(null)}
              >
                View in Fortnite ↗
              </a>
            </div>
          </section>
        </>
      )}
      <nav className="mobile-nav">
        {nav
          .filter(([label]) =>
            ["Overview", "Cosmetics", "Item Shop", "Locker", "Sprites"].includes(label),
          )
          .map(([label, icon]) => (
          <button
            key={label}
            className={active === label ? "active" : ""}
            onClick={() => go(label)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}
