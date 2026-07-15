import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import type { ThemeName } from "@/types";
import { getThemeForRequest } from "../server/theme";
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Michael Lim | Senior Frontend Engineer",
  description:
    "Portfolio of Michael Lim, a senior frontend engineer specializing in React, React Native, and TypeScript.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: ThemeName = await getThemeForRequest();

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
