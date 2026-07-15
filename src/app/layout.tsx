import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

import type { ThemeName } from "@/types";
import { getThemeForRequest } from "../server/theme";
import { ThemeProvider } from "./ThemeProvider";

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Lim | Senior Software Engineer",
  description:
    "Portfolio of Michael Lim, a senior software engineer specializing in React, React Native, and TypeScript.",
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
      <body className={`${vt323.variable} bg-canvas text-ink antialiased`}>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
