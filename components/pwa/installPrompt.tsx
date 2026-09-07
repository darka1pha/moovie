"use client";

import React, { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X, Check, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(standalone);
    };

    checkStandalone();

    // Check iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(isIosDevice);

    // Capture standard PWA prompt (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  // If already installed or dismissed, do not render floating banner
  if (isStandalone || isInstalled || isDismissed || (!deferredPrompt && !isIos)) {
    return (
      <>
        {showIosGuide && (
          <IosGuideModal onClose={() => setShowIosGuide(false)} />
        )}
      </>
    );
  }

  return (
    <>
      {/* Floating Smart Banner for Mobile / Tablet */}
      <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 z-40 animate-fade-in pointer-events-auto">
        <div className="bg-[#16151a]/95 border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 shadow-black/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-fuelYellow/15 border border-fuelYellow/30 flex items-center justify-center text-fuelYellow shrink-0 shadow-sm">
              <Smartphone size={20} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h4 className="text-white font-bold text-sm truncate">Install Moovie App</h4>
              <p className="text-neutral-400 text-xs truncate">Add to your home screen for quick access</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-lg bg-fuelYellow text-black font-semibold text-xs transition-all hover:brightness-110 active:scale-95 flex items-center gap-1 shadow-md shadow-fuelYellow/20"
            >
              <Download size={13} aria-hidden="true" />
              <span>Install</span>
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss install banner"
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {showIosGuide && (
        <IosGuideModal onClose={() => setShowIosGuide(false)} />
      )}
    </>
  );
};

export const IosGuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-install-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#16151a] border border-white/15 rounded-3xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-fuelYellow/15 border border-fuelYellow/30 flex items-center justify-center text-fuelYellow">
            <Smartphone size={24} />
          </div>
          <div>
            <h3 id="ios-install-title" className="text-white font-bold text-lg">
              Install Moovie on iOS
            </h3>
            <p className="text-neutral-400 text-xs">Run Moovie fullscreen like a native app</p>
          </div>
        </div>

        <div className="space-y-3.5 my-6 text-sm text-neutral-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Share size={16} />
            </div>
            <div>
              <p className="font-semibold text-white">1. Tap the Share button</p>
              <p className="text-xs text-neutral-400 mt-0.5">Located in the bottom navigation bar in Safari.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <PlusSquare size={16} />
            </div>
            <div>
              <p className="font-semibold text-white">2. Scroll down & tap &ldquo;Add to Home Screen&rdquo;</p>
              <p className="text-xs text-neutral-400 mt-0.5">Moovie icon will appear on your iOS home screen.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-fuelYellow/20 text-fuelYellow flex items-center justify-center shrink-0 mt-0.5">
              <Check size={16} />
            </div>
            <div>
              <p className="font-semibold text-white">3. Open from Home Screen</p>
              <p className="text-xs text-neutral-400 mt-0.5">Enjoy instantaneous load times with zero browser address bar!</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-fuelYellow text-black font-bold text-sm transition-all hover:brightness-110 active:scale-98 shadow-lg shadow-fuelYellow/20"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export const InstallAppCard: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(standalone);
    };

    checkStandalone();
    const ua = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(ua));

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (isStandalone || isInstalled) {
    return (
      <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <Check size={16} />
          <span>Moovie App is already installed as a native PWA on this device.</span>
        </div>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      // Direct instructions for desktop/other browsers
      alert("To install Moovie, use your browser's install icon in the address bar (Chrome, Edge, Brave).");
    }
  };

  return (
    <>
      <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-fuelYellow/15 border border-fuelYellow/30 flex items-center justify-center text-fuelYellow shrink-0">
            <Smartphone size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Install Native PWA</p>
            <p className="text-xs text-battleGrey">
              Install Moovie on your desktop or phone for fullscreen, offline support & zero browser UI
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleInstallClick}
          className="px-3.5 py-1.5 rounded-lg bg-fuelYellow text-black font-semibold text-xs transition-all hover:brightness-110 active:scale-95 flex items-center gap-1.5 shrink-0 shadow-md shadow-fuelYellow/20"
        >
          <Download size={13} />
          <span>Install</span>
        </button>
      </div>

      {showIosGuide && (
        <IosGuideModal onClose={() => setShowIosGuide(false)} />
      )}
    </>
  );
};

export default InstallPrompt;
