"use client";

import { ThemeProvider as NextThemesProvider, ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps extends Omit<NextThemesProviderProps, 'children'> {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={attribute} defaultTheme={defaultTheme}>
      {children}
    </NextThemesProvider>
  );
}
