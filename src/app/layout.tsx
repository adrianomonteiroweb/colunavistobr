import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/app/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { getInitialThemePalette } from "@/app/theme-palette.server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coluna Visto BR",
  description:
    "Coluna especializada em vistos brasileiros, imigração e orientações para estrangeiros no Brasil",
  keywords:
    "visto brasileiro, imigração, Brasil, documentação, estrangeiros, residência",
  authors: [{ name: "Coluna Visto BR" }],
  openGraph: {
    title: "Coluna Visto BR",
    description:
      "Coluna especializada em vistos brasileiros, imigração e orientações para estrangeiros no Brasil",
    type: "website",
    locale: "pt_BR",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
};

export const generateViewport = (): Viewport => ({
  width: "device-width",
  initialScale: 1,
  themeColor: "#009C3B",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialPalette = await getInitialThemePalette();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider initialPalette={initialPalette}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
