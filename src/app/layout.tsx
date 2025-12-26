import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mcp.waleedx.app/"),
  title: "Supabase MCP",
  description:
    "Powerful MCP server for seamless Supabase interaction, full CRUD support, and effortless data management.",
  icons: "/favicon.png",
  openGraph: {
    title: "Supabase MCP",
    description:
      "Powerful MCP server for seamless Supabase interaction, full CRUD support, and effortless data management",
    url: "https://mcp.waleedx.app/",
    images: ["https://mcp.waleedx.app/og-image.png"],
    siteName: "Supabase MCP",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Supabase MCP",
    description:
      "Powerful MCP server for seamless Supabase interaction, full CRUD support, and effortless data management",
    images: ["https://mcp.waleedx.app/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
