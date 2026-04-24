"use client";

import { useEffect } from "react";
import i18n from "@/lib/i18";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const currentLang = i18n.resolvedLanguage || i18n.language || "en";
    const normalizedLang = currentLang.startsWith("ar") ? "ar" : "en";
    const dir = normalizedLang === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = normalizedLang;
    document.documentElement.dir = dir;
  }, []);

  return (
    <>
      {children} 
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
};

export default ClientProvider;