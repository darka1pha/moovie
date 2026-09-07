"use client";

import React from "react";
import { Palette } from "lucide-react";
import { useTheme } from "@/components/theme/themeContext";

export const ThemeTrigger: React.FC = () => {
  const { openCustomizer, accentOption } = useTheme();

  return (
    <button
      type="button"
      onClick={openCustomizer}
      aria-label="Customize theme accent and display"
      title="Customize Theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 focus-visible:outline focus-visible:outline-2"
    >
      <Palette size={18} aria-hidden="true" />
      {/* Small active color dot indicator */}
      <span
        className="absolute top-2 right-2 w-2 h-2 rounded-full ring-2 ring-[#0d0c11]"
        style={{ backgroundColor: accentOption.hex }}
      />
    </button>
  );
};

export default ThemeTrigger;
