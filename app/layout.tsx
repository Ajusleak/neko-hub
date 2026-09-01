import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neko Hub",
  description: "Fortnite cosmetic intelligence, locker insights, collections, alerts, and AI.",
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }], apple: "/favicon.png" },
  openGraph: { title: "Neko Hub", description: "Fortnite intelligence, sharpened.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
