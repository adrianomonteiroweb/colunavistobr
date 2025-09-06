// Funções server-only para acesso ao banco de dados e settings
import { ThemePalette } from "@/components/theme-provider";

export async function getThemePaletteFromSettings(): Promise<ThemePalette | null> {
  const { db } = await import("@/lib/db/src/db");
  const { settings } = await import("@/lib/db/src/schema");
  const { eq } = await import("drizzle-orm");
  const MOCK_ADMIN_ID = 1;
  try {
    const setting = await db.query.settings.findFirst({
      where: eq(settings.admin_id, MOCK_ADMIN_ID),
    });
    if (
      setting &&
      typeof setting.data === "object" &&
      setting.data !== null &&
      Object.prototype.hasOwnProperty.call(setting.data, "theme")
    ) {
      const theme = (setting.data as { theme?: any }).theme;
      if (
        theme &&
        typeof theme === "object" &&
        "name" in theme &&
        "primary" in theme &&
        "secondary" in theme &&
        "background" in theme &&
        "text" in theme
      ) {
        return theme;
      }
    }
    return null;
  } catch {
    return null;
  }
}
