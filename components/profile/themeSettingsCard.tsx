"use client";

import React from "react";
import { Palette, Moon, Check, Sparkles, Star } from "lucide-react";
import { useTheme, ACCENT_OPTIONS, AccentId } from "@/components/theme/themeContext";
import { InstallAppCard } from "@/components/pwa/installPrompt";

export const ThemeSettingsCard: React.FC = () => {
  const { accent, setAccent, isAmoled, setIsAmoled, accentOption } = useTheme();

  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{
            backgroundColor: `rgba(${accentOption.rgb}, 0.15)`,
            color: accentOption.hex,
            border: `1px solid rgba(${accentOption.rgb}, 0.3)`,
          }}
        >
          <Palette size={16} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-white text-lg font-bold tracking-tight">Appearance & Theme</h2>
          <p className="text-battleGrey text-xs">Personalize your cinema accent color and OLED mode</p>
        </div>
      </div>

      {/* Accent Color Palette Selector */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-2.5">
          Accent Color
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {ACCENT_OPTIONS.map((opt) => {
            const isSelected = accent === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAccent(opt.id)}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all text-left ${
                  isSelected
                    ? "bg-white/[0.08] border-white/30 shadow-md"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: opt.hex,
                    boxShadow: isSelected ? `0 0 10px ${opt.hex}` : "none",
                  }}
                >
                  {isSelected && <Check size={11} className="text-black stroke-[3]" />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{opt.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AMOLED Pure Black Toggle */}
      <div className="mt-5 p-4 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
            <Moon size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Pure AMOLED Black</p>
            <p className="text-xs text-battleGrey">
              Pitch black backgrounds for OLED screens and true infinite contrast
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isAmoled}
          onClick={() => setIsAmoled(!isAmoled)}
          className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0 relative focus-visible:outline focus-visible:outline-2 ${
            isAmoled ? "bg-white" : "bg-white/20"
          }`}
          style={{
            backgroundColor: isAmoled ? accentOption.hex : undefined,
          }}
        >
          <div
            className={`w-5 h-5 rounded-full bg-black shadow-md transform transition-transform duration-200 ${
              isAmoled ? "translate-x-5" : "translate-x-0 bg-white"
            }`}
          />
        </button>
      </div>

      {/* Live Preview Banner */}
      <div
        className="mt-4 p-3 rounded-xl border flex items-center justify-between gap-3 text-xs"
        style={{
          backgroundColor: isAmoled ? "#000000" : "rgba(255, 255, 255, 0.02)",
          borderColor: `rgba(${accentOption.rgb}, 0.25)`,
        }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={14} style={{ color: accentOption.hex }} />
          <span className="text-neutral-300">
            Previewing <strong style={{ color: accentOption.hex }}>{accentOption.name}</strong> on {isAmoled ? "Pure AMOLED" : "Dark Cinema"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-medium" style={{ color: accentOption.hex }}>
          <Star size={12} fill={accentOption.hex} />
          <span>Active</span>
        </div>
      </div>

      {/* Native App Installation */}
      <InstallAppCard />
    </div>
  );
};

export default ThemeSettingsCard;
