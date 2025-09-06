"use client";
import { useTheme } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminThemePaletteSection = () => {
  const { currentPaletteName, setPalette, palettes } = useTheme();

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="border border-[var(--card-border)] shadow-sm bg-[var(--card-background)] mb-8">
        <CardHeader>
          <CardTitle className="text-[var(--text-primary)]">
            Escolha sua Paleta de Cores
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <Card
              key={palette.name}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                "border-2",
                currentPaletteName === palette.name
                  ? "border-[var(--primary)] shadow-md"
                  : "border-[var(--card-border)]"
              )}
              onClick={() => setPalette(palette)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {palette.name}
                </h3>
                <div className="flex gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.background }}
                    title="Fundo da Página"
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.background }}
                    title="Fundo do Card"
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.text }}
                    title="Texto Principal"
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: palette.primary }}
                    title="Botão Principal"
                  />
                </div>
                <Button
                  variant={
                    currentPaletteName === palette.name ? "default" : "outline"
                  }
                  className="w-full"
                  onClick={() => setPalette(palette)}
                >
                  {currentPaletteName === palette.name
                    ? "Selecionado"
                    : "Selecionar"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminThemePaletteSection;
