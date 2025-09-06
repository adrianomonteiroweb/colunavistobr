"use client";
import { Select, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme, PALETTES, ThemePalette } from "@/components/theme-provider";
import React, { useState } from "react";

export const ThemePaletteSelector = ({
  onSave,
}: {
  onSave?: (palette: ThemePalette) => void;
} = {}): React.ReactNode => {
  const { palette, setPalette } = useTheme();
  const [selected, setSelected] = useState<string>(palette.name);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string): void => {
    setSelected(value);
    const found = PALETTES.find((p) => p.name === value);
    if (found) setPalette(found);
  };

  const handleSave = async (): Promise<void> => {
    setLoading(true);
    const found = PALETTES.find((p) => p.name === selected);
    if (found && onSave) await onSave(found);
    setLoading(false);
  };

  return (
    <Card className="max-w-md mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold mb-2">Theme Palette</h2>
      <Select
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full"
      >
        <option value="" disabled hidden>
          Select a palette
        </option>
        {PALETTES.map((p) => (
          <SelectItem key={p.name} value={p.name}>
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </SelectItem>
        ))}
      </Select>
      <Button onClick={handleSave} disabled={loading} className="mt-2">
        {loading ? "Saving..." : "Save"}
      </Button>
    </Card>
  );
};
