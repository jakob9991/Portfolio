// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ✅ Fonts laden
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jakob Dickhardt - Portfolio",
  description: "Full-Stack Entwickler, Medieninformatik Student & KI-Enthusiast",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jakob Dickhardt - Portfolio",
  },
  icons: {
    icon: "/images/titleLogo.svg",
    shortcut: "/images/titleLogo.svg",
    apple: "/images/titleLogo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f1729" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1729" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
