"use client";

import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

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
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  const navbarVariants = {
    initial: isHomePage ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 },
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
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      <motion.nav
        key="navbar"
        className="fixed top-0 left-0 right-0 bg-transparent z-50 py-4 px-6 md:px-10 "
        initial="initial"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className="mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="rounded-full bg-white w-6 h-6" />
            <span className="text-xl font-bold text-white">Awesome Studio</span>
          </Link>

          {/* Desktop Menu */}
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

            {/* Language Switcher Desktop */}
            <LanguageSwitcher />
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Language Switcher Mobile */}
            <LanguageSwitcher isMobile />

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-500" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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

      {/* Overlay for Mobile Menu */}
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