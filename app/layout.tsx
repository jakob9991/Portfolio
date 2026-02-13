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
  icons: {
    icon: "/images/titleLogo.svg",
    shortcut: "/images/titleLogo.svg",
    apple: "/images/titleLogo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d14",
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
