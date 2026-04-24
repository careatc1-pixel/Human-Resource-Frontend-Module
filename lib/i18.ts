"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const LANGUAGE_KEY = "selected_language";
const LANGUAGE_DIRECTION: Record<string, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

if (!i18n.isInitialized) {
  const initialLng =
    typeof window !== "undefined"
      ? localStorage.getItem(LANGUAGE_KEY) || "en"
      : "en";

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: initialLng,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: { escapeValue: false },
  });

  if (typeof window !== "undefined") {
    i18n.on("languageChanged", (lng) => {
      localStorage.setItem(LANGUAGE_KEY, lng);
      const dir = LANGUAGE_DIRECTION[lng] || "ltr";
      document.documentElement.lang = lng;
      document.documentElement.dir = dir;
      localStorage.setItem("direction", dir);
    });
  }
}

export default i18n;