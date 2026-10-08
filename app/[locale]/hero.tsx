"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, easeOut } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Galaxy from "./Galaxy";

const Hero = () => {
  const t = useTranslations("Hero");
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navigation?.type === "reload" || navigation?.type === "navigate") {
      setHasAnimated(false);
    } else {
      setHasAnimated(true);
    }
  }, []);

  const videoScale = useTransform(scrollY, [0, 500], [0.9, 1], {
    ease: easeOut,
  });
  const videoWidth = useTransform(scrollY, [0, 500], ["85%", "100%"], {
    ease: easeOut,
  });
  const videoBorderRadius = useTransform(scrollY, [0, 500], [32, 0], {
    ease: easeOut,
  });

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0, 1],
        delay: 0.6,
      },
    },
  };

  const videoContainerVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 1.2,
        ease: [0.25, 0.1, 0, 1],
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-black min-h-screen">
      {/* Galaxy Background & Hero Content Container (Full Screen) */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Galaxy Component as Background */}
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>

        {/* Main Content Overlay */}
        <motion.div
          className="relative z-10 w-full flex flex-col justify-center items-center px-4 pointer-events-none"
          initial={hasAnimated ? "visible" : "hidden"}
          animate="visible"
          variants={contentVariants}
        >
          <div className="md:max-w-3xl text-center pointer-events-auto">
            <motion.h1
              variants={contentVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              <motion.span className="inline-block" variants={contentVariants}>
                {t("headingLine1")}
              </motion.span>
              <br />
              <motion.span className="inline-block" variants={contentVariants}>
                {t("headingLine2")}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={contentVariants}
              className="text-lg md:text-xl text-neutral-300 mb-8"
            >
              {t("descriptionLine1")}
              <br />
              {t("descriptionLine2")}
            </motion.p>

            {/* Action Buttons inside Galaxy */}
            <motion.div
              variants={buttonVariants}
              className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
            >
              <Link
                href="/projects"
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-lg"
              >
                {t("viewWork")}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                {t("bookMeeting")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Video Section */}
      <motion.div
        className="flex justify-center w-full md:px-0 z-10 -mt-16 md:-mt-24 pb-16"
        initial={hasAnimated ? "visible" : "hidden"}
        animate="visible"
        variants={videoContainerVariants}
      >
        <motion.div
          style={{
            width: videoWidth,
            scale: videoScale,
            borderRadius: videoBorderRadius,
            overflow: "hidden",
          }}
          className="relative w-full md:w-auto shadow-2xl"
        >
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;