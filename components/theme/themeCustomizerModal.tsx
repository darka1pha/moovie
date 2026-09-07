"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Palette, Sparkles, Moon, Star, RotateCcw } from "lucide-react";
import { useTheme, ACCENT_OPTIONS, AccentId } from "./themeContext";

export const ThemeCustomizerModal: React.FC = () => {
  const {
    accent,
    setAccent,
    isAmoled,
    setIsAmoled,
    isCustomizerOpen,
    closeCustomizer,
  } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isCustomizerOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeCustomizer();
      };
      window.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCustomizerOpen, closeCustomizer]);

  if (!mounted || !isCustomizerOpen) return null;

  const currentOption = ACCENT_OPTIONS.find((a) => a.id === accent) || ACCENT_OPTIONS[0];

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-customizer-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={closeCustomizer}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-lg rounded-3xl bg-[#131218]/95 border border-white/10 shadow-2xl shadow-black/90 p-6 sm:p-7 overflow-hidden flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
              style={{
                backgroundColor: `rgba(${currentOption.rgb}, 0.15)`,
                borderColor: `rgba(${currentOption.rgb}, 0.3)`,
                color: currentOption.hex,
                borderWidth: "1px",
              }}
            >
              <Palette size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 id="theme-customizer-title" className="text-white font-extrabold text-xl tracking-tight">
                Theme Customizer
              </h2>
              <p className="text-neutral-400 text-xs mt-0.5">
                Personalize your Moovie cinema accent & display
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCustomizer}
            aria-label="Close theme customizer"
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Accent Color Presets */}
        <div>
          <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-3">
            Select Accent Color
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ACCENT_OPTIONS.map((opt) => {
              const isSelected = accent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAccent(opt.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? "bg-white/[0.08] border-white/30 shadow-md"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center shadow-md transition-transform"
                      style={{
                        backgroundColor: opt.hex,
                        boxShadow: isSelected ? `0 0 14px ${opt.hex}` : "none",
                        transform: isSelected ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {isSelected && <Check size={14} className="text-black stroke-[3]" />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">
                        {opt.name}
                      </p>
                      <p className="text-[11px] text-neutral-400">{opt.tagline}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {opt.hex}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AMOLED Pure Black Toggle */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
              <Moon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Pure AMOLED Black</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                True #000000 pitch black backgrounds for OLED panels & battery saving
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isAmoled}
            onClick={() => setIsAmoled(!isAmoled)}
            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 ease-in-out shrink-0 relative focus-visible:outline focus-visible:outline-2 ${
              isAmoled ? "bg-white" : "bg-white/20"
            }`}
            style={{
              backgroundColor: isAmoled ? currentOption.hex : undefined,
            }}
          >
            <div
              className={`w-5.5 h-5.5 rounded-full bg-black shadow-md transform transition-transform duration-300 ease-in-out ${
                isAmoled ? "translate-x-5.5 bg-black" : "translate-x-0 bg-white"
              }`}
            />
          </button>
        </div>

        {/* Real-Time Live Preview Card */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} style={{ color: currentOption.hex }} />
              <span>Live Interface Preview</span>
            </span>
            <span className="font-mono text-[10px]">
              {isAmoled ? "OLED Pitch Black" : "Dark Cinema"}
            </span>
          </div>

          <div
            className="p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all"
            style={{
              backgroundColor: isAmoled ? "#000000" : "#16151a",
              borderColor: `rgba(${currentOption.rgb}, 0.3)`,
              boxShadow: `0 8px 24px -6px rgba(${currentOption.rgb}, 0.15)`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-14 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 shadow-inner"
                style={{
                  backgroundColor: `rgba(${currentOption.rgb}, 0.15)`,
                  color: currentOption.hex,
                  border: `1px solid rgba(${currentOption.rgb}, 0.3)`,
                }}
              >
                4K
              </div>
              <div>
                <p className="text-sm font-bold text-white">Inception (2010)</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border"
                    style={{
                      backgroundColor: `rgba(${currentOption.rgb}, 0.15)`,
                      color: currentOption.hex,
                      borderColor: `rgba(${currentOption.rgb}, 0.3)`,
                    }}
                  >
                    Sci-Fi / Action
                  </span>
                  <span className="text-xs text-neutral-300 flex items-center gap-1">
                    <Star size={11} fill={currentOption.hex} color={currentOption.hex} />
                    <span>8.8</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95 shadow-md"
              style={{
                backgroundColor: currentOption.hex,
                boxShadow: `0 4px 12px rgba(${currentOption.rgb}, 0.3)`,
              }}
            >
              Watch Now
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button
            type="button"
            onClick={() => {
              setAccent("yellow");
              setIsAmoled(false);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={closeCustomizer}
            className="px-5 py-2 rounded-xl text-xs font-bold text-black shadow-lg transition-all hover:brightness-110 active:scale-95"
            style={{
              backgroundColor: currentOption.hex,
              boxShadow: `0 4px 14px rgba(${currentOption.rgb}, 0.25)`,
            }}
          >
            Apply & Done
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ThemeCustomizerModal;
