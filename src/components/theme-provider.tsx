"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type ThemePalette = {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

export const PALETTES: ThemePalette[] = [
  {
    name: "clean-elegant",
    primary: "#1a237e", // Azul escuro sofisticado
    secondary: "#ffd700", // Dourado elegante
    background: "#f8fafc", // Branco suave
    text: "#23272f", // Cinza escuro
  },
  {
    name: "dark",
    primary: "#18181b",
    secondary: "#fbbf24",
    background: "#09090b",
    text: "#fafafa",
  },
  {
    name: "blue",
    primary: "#0ea5e9",
    secondary: "#38bdf8", // Azul claro coerente
    background: "#f0f9ff",
    text: "#0f172a",
  },
  {
    name: "green",
    primary: "#22c55e",
    secondary: "#fbbf24",
    background: "#f7fee7",
    text: "#14532d",
  },
];

export type ThemeContextType = {
  palette: ThemePalette;
  setPalette: (palette: ThemePalette) => void;
  currentPaletteName: string;
  palettes: ThemePalette[];
  getCurrentPalette: () => ThemePalette;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export type ThemeProviderProps = {
  children: ReactNode;
  initialPalette?: ThemePalette;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialPalette,
}) => {
  // Carregar paleta do localStorage, se existir
  const getInitialPalette = () => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("theme-palette");
      if (stored) {
        const found = PALETTES.find((p) => p.name === stored);
        if (found) return found;
      }
    }
    return initialPalette || PALETTES[0];
  };

  const [palette, setPaletteState] = useState<ThemePalette>(getInitialPalette);

  // Atualizar localStorage e estado
  const setPalette = (newPalette: ThemePalette) => {
    setPaletteState(newPalette);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme-palette", newPalette.name);
    }
  };

  // Sincronizar entre abas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme-palette" && e.newValue) {
        const found = PALETTES.find((p) => p.name === e.newValue);
        if (found) setPaletteState(found);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Variáveis CSS para compatibilidade com os componentes
    root.style.setProperty("--color-primary", palette.primary);
    root.style.setProperty("--color-secondary", palette.secondary);
    root.style.setProperty("--color-background", palette.background);
    root.style.setProperty("--color-text", palette.text);

    // Variáveis usadas nos componentes
    root.style.setProperty("--text-primary", palette.text);
    root.style.setProperty("--text-secondary", palette.secondary);
    root.style.setProperty("--background-color", palette.background);
    root.style.setProperty("--card-background", "#fff"); // Ajuste conforme necessário
    root.style.setProperty("--card-border", palette.primary);
    root.style.setProperty("--card-inner-background", "#f9fafb"); // Ajuste conforme necessário
    root.style.setProperty("--input-border", palette.primary);
    root.style.setProperty("--code-background", "#f3f4f6"); // Ajuste conforme necessário
    root.style.setProperty("--primary-button", palette.primary);
    root.style.setProperty("--primary-button-foreground", "#fff");
    root.style.setProperty("--success-color", "#22c55e");
    root.style.setProperty("--highlight-color", palette.secondary);
    root.style.setProperty("--tertiary-accent-color", palette.primary);
    root.style.setProperty("--secondary-accent-color", palette.secondary);
  }, [palette]);

  const getCurrentPalette = () => palette;
  return (
    <ThemeContext.Provider
      value={{
        palette,
        setPalette,
        currentPaletteName: palette.name,
        palettes: PALETTES,
        getCurrentPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
