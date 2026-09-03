import type { ReactNode } from "react";
import { MultiColumnList } from "@amodeo/proclaimer/ui/components/display/multi-column-list/MultiColumnList";
import { useFontSize, type FontSize, FontSizeSelector } from "@amodeo/proclaimer/util/font-size";
import { useTheme, type ThemeMode, ThemeSelector } from "@amodeo/proclaimer/util/theme";

type SelectorItem =
  | { id: "theme"; value: ThemeMode; onChange: (value: ThemeMode) => void }
  | { id: "font_size"; value: FontSize; onChange: (value: FontSize) => void };

export function AppearanceForm() {
  const { font_size, setFontSize } = useFontSize();
  const { theme_mode, setTheme } = useTheme();

  const items: SelectorItem[] = [
    { id: "theme", value: theme_mode, onChange: setTheme },
    { id: "font_size", value: font_size, onChange: setFontSize },
  ];

  const render_item = (item: SelectorItem): ReactNode => {
    if (item.id === "theme") {
      return <ThemeSelector value={item.value} onChange={item.onChange} />;
    }
    return <FontSizeSelector value={item.value} onChange={item.onChange} />;
  };

  return <MultiColumnList items={items} get_id={(item) => item.id} render_item={render_item} />;
}
