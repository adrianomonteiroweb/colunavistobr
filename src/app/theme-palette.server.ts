import { getThemePaletteFromSettings } from "@/lib/server-utils";
import { PALETTES, ThemePalette } from "@/components/theme-provider";

export const getInitialThemePalette = async (): Promise<ThemePalette> => {
  const palette = await getThemePaletteFromSettings();
  return palette || PALETTES[0];
};
