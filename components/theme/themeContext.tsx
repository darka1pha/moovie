"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type AccentId = "yellow" | "cyan" | "crimson" | "emerald" | "violet";

export interface AccentOption {
  id: AccentId;
  name: string;
  tagline: string;
  hex: string;
  rgb: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: "yellow",
    name: "Fuel Yellow",
    tagline: "Classic Moovie Gold",
    hex: "#efae28",
    rgb: "239, 174, 40",
  },
  {
    id: "cyan",
    name: "Cyberpunk Cyan",
    tagline: "Electric Sci-Fi",
    hex: "#00f0ff",
    rgb: "0, 240, 255",
  },
  {
    id: "crimson",
    name: "Cinema Crimson",
    tagline: "Theater Red",
    hex: "#e50914",
    rgb: "229, 9, 20",
  },
  {
    id: "emerald",
    name: "Emerald Matrix",
    tagline: "Vibrant Jade",
    hex: "#10b981",
    rgb: "16, 185, 129",
  },
  {
    id: "violet",
    name: "Neon Violet",
    tagline: "Synthwave Purple",
    hex: "#a855f7",
    rgb: "168, 85, 247",
  },
];

interface ThemeContextType {
  accent: AccentId;
  setAccent: (accent: AccentId) => void;
  isAmoled: boolean;
  setIsAmoled: (val: boolean) => void;
  accentOption: AccentOption;
  isCustomizerOpen: boolean;
  openCustomizer: () => void;
  closeCustomizer: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_ACCENT_KEY = "moovie-theme-accent";
const THEME_AMOLED_KEY = "moovie-theme-amoled";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accent, setAccentState] = useState<AccentId>("yellow");
  const [isAmoled, setIsAmoledState] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read saved preferences on mount
  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem(THEME_ACCENT_KEY) as AccentId | null;
    const savedAmoled = localStorage.getItem(THEME_AMOLED_KEY);

    if (savedAccent && ACCENT_OPTIONS.some((a) => a.id === savedAccent)) {
      setAccentState(savedAccent);
      document.documentElement.setAttribute("data-theme-accent", savedAccent);
    } else {
      document.documentElement.setAttribute("data-theme-accent", "yellow");
    }

    if (savedAmoled === "true") {
      setIsAmoledState(true);
      document.documentElement.setAttribute("data-amoled", "true");
    } else {
      document.documentElement.setAttribute("data-amoled", "false");
    }
  }, []);

  const setAccent = (newAccent: AccentId) => {
    setAccentState(newAccent);
    localStorage.setItem(THEME_ACCENT_KEY, newAccent);
    document.documentElement.setAttribute("data-theme-accent", newAccent);
  };

  const setIsAmoled = (val: boolean) => {
    setIsAmoledState(val);
    localStorage.setItem(THEME_AMOLED_KEY, String(val));
    document.documentElement.setAttribute("data-amoled", String(val));
  };

  const accentOption = useMemo(() => {
    return ACCENT_OPTIONS.find((a) => a.id === accent) || ACCENT_OPTIONS[0];
  }, [accent]);

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        isAmoled,
        setIsAmoled,
        accentOption,
        isCustomizerOpen,
        openCustomizer: () => setIsCustomizerOpen(true),
        closeCustomizer: () => setIsCustomizerOpen(false),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
