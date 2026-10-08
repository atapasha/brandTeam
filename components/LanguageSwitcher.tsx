"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

// تعریف Interface مربوط به Props
interface LanguageSwitcherProps {
  isMobile?: boolean;
}

const languages = [
  { code: "fa", label: "فارسی", shortLabel: "FA" },
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "de", label: "Deutsch", shortLabel: "DE" },
  { code: "ru", label: "Русский", shortLabel: "RU" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "it", label: "Italiano", shortLabel: "IT" },
];

export const LanguageSwitcher = ({ isMobile = false }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
    setIsOpen(false);
  };

  const currentLang = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors focus:outline-none"
      >
        <Globe className="w-4 h-4 text-neutral-600" />
        {/* در صورت نیاز می‌توانید در حالت موبایل فقط عنوان کوتاه یا نمایش معمولی را تغییر دهید */}
        <span>{isMobile ? currentLang.shortLabel : currentLang.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 ltr:right-0 rtl:left-0 rtl:right-auto mt-2 w-40 rounded-xl bg-white shadow-lg border border-neutral-100 py-1 z-50 overflow-hidden max-h-60 overflow-y-auto"
          >
            {languages.map((lang) => {
              const isSelected = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm text-right transition-colors ${
                    isSelected
                      ? "bg-neutral-100 text-black font-semibold"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                  }`}
                >
                  <span>{lang.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-black" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};