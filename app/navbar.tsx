"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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
      opacitty: 0,
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
          <Link href={"/"} className="flex items-center space-x-1">
            <div className="rounded-full bg-black w-6 h-6 " />
            <span className="text-xl font-bold">Awesome Studio</span>
          </Link>

          {/* desktop menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`${
                  pathname === link.href ? "text-black" : "text-neutral-400"
                } hover:text-black transition-colors duration-200`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-500" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-500" />
            )}
          </button>
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
                className={`${
                  pathname === link.href ? "text-black" : "text-neutral-400"
                } hover:text-black`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/*overlay for mobile menu */}
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
