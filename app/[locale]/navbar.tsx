"use client";

import { Menu, X, Globe } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const links = [
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  // تابع تغییر زبان با حفظ مسیر فعلی
  const toggleLanguage = () => {
    const nextLocale = locale === "fa" ? "en" : "fa";
    router.replace(pathname, { locale: nextLocale });
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mobileMenuOpen) {
      const scrollingUp = latest < prevScrollY;
      const shouldShow = scrollingUp || latest < 50;
      setIsVisible(shouldShow);

      if (latest > 50 && !hasScrolled) {
        setHasScrolled(true);
      } else if (latest < 50) {
        setHasScrolled(false);
      }
    }
    setPrevScrollY(latest);
  });

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  const navbarVariants = {
    initial: isHomePage
      ? {
          y: -100,
          opacity: 0,
        }
      : {
          y: 0,
          opacity: 1,
        },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: isHomePage && !hasScrolled ? 1.8 : 0,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.nav
        key="navbar"
        className="fixed top-0 left-0 right-0 bg-white z-50 py-4 px-6 md:px-10 border-b"
        initial="initial"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className="mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="rounded-full bg-black w-6 h-6" />
            <span className="text-xl font-bold">Awesome Studio</span>
          </Link>

          {/* desktop menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`${
                  pathname === link.href ? "text-black font-semibold" : "text-neutral-400"
                } hover:text-black transition-colors duration-200`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher Button (Desktop) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-sm font-medium hover:bg-neutral-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-neutral-600" />
              <span>{locale === "fa" ? "English" : "فارسی"}</span>
            </button>
          </div>

          {/* mobile buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-200 text-xs font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-600" />
              <span>{locale === "fa" ? "EN" : "FA"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-500" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-500" />
              )}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <motion.div
          initial="closed"
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col space-y-4 pt-4">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`${
                  pathname === link.href ? "text-black font-semibold" : "text-neutral-400"
                } hover:text-black`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* overlay for mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default Navbar;