"use client";

import { useEffect } from "react";

export default function PwaRegistrar() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.location.protocol.startsWith("http")
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            if (process.env.NODE_ENV === "development") {
              console.log("[PWA] Service Worker registered with scope:", reg.scope);
            }
          })
          .catch((err) => {
            console.warn("[PWA] Service Worker registration failed:", err);
          });
      });
    }
  }, []);

  return null;
}
