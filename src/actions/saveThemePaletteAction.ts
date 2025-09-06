"use server";
import { ThemePalette } from "@/components/theme-provider";
import { db } from "@/lib/db/src/db";
import { settings } from "@/lib/db/src/schema";
import { eq } from "drizzle-orm";

// TODO: Obter admin_id do contexto de autenticação real
const MOCK_ADMIN_ID = 1;

export const saveThemePaletteAction = async (
  palette: ThemePalette
): Promise<void> => {
  // Busca setting existente
  const existing = await db.query.settings.findFirst({
    where: eq(settings.admin_id, MOCK_ADMIN_ID),
  });
  if (existing) {
    await db
      .update(settings)
      .set({
        data: {
          ...(typeof existing.data === "object" && existing.data !== null
            ? existing.data
            : {}),
          theme: palette,
        },
        updated_at: new Date(),
      })
      .where(eq(settings.admin_id, MOCK_ADMIN_ID));
  } else {
    await db.insert(settings).values({
      admin_id: MOCK_ADMIN_ID,
      data: { theme: palette },
    });
  }
};
