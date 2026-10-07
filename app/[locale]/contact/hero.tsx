"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type TabId = "projects" | "clients";
type CategoryId =
  | "all"
  | "branding"
  | "uxui"
  | "development"
  | "strategy"
  | "marketing"
  | "research"
  | "analytics";

interface CategoryCount {
  projects: number;
  clients: number;
}

interface CategoryCounts {
  [key: string]: CategoryCount;
}

interface Project {
  id: number;
  name: string;
  video: string;
  category: CategoryId;
  size: string;
  imageHeight: string;
}

interface Client {
  id: number;
  name: string;
  image: string;
  category: CategoryId;
}

const Hero = () => {
  const t = useTranslations("ProjectsPage");

  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const clients: Client[] = [
    { id: 1, name: "Redbull", image: "logo-1.svg", category: "branding" },
    { id: 2, name: "Salesforce", image: "logo-2.svg", category: "development" },
    { id: 3, name: "Microsoft", image: "logo-3.svg", category: "uxui" },
    { id: 4, name: "Spotify", image: "logo-4.svg", category: "branding" },
    { id: 5, name: "Lyft", image: "logo-5.svg", category: "development" },
    { id: 6, name: "Coca-Cola", image: "logo-6.svg", category: "uxui" },
    { id: 7, name: "Under Armour", image: "logo-7.svg", category: "uxui" },
    { id: 8, name: "Slack", image: "logo-1.svg", category: "analytics" },
    { id: 9, name: "LinkedIn", image: "logo-2.svg", category: "marketing" },
    { id: 10, name: "Figma", image: "logo-3.svg", category: "research" },
    { id: 11, name: "Sony", image: "logo-4.svg", category: "strategy" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      name: "Sony",
      video:
        "https://videos.pexels.com/video-files/6572598/6572598-hd_1920_1080_25fps.mp4",
      category: "branding",
      size: "col-span-12 md:col-span-4 row-span-1",
      imageHeight: "h-80",
    },
    {
      id: 2,
      name: "Adidas",
      video:
        "https://videos.pexels.com/video-files/4126123/4126123-uhd_2732_1440_25fps.mp4",
      category: "development",
      size: "col-span-12 md:col-span-4",
      imageHeight: "h-48",
    },
    {
      id: 3,
      name: "Tokyo Roast",
      video:
        "https://videos.pexels.com/video-files/2909914/2909914-uhd_2732_1440_24fps.mp4",
      category: "uxui",
      size: "col-span-12 md:col-span-4",
      imageHeight: "h-48",
    },
    {
      id: 4,
      name: "Spotify",
      video:
        "https://videos.pexels.com/video-files/5077471/5077471-uhd_1440_2732_25fps.mp4",
      category: "strategy",
      size: "col-span-12 row-span-2",
      imageHeight: "h-[600px]",
    },
    {
      id: 5,
      name: "Ecomworld",
      video:
        "https://videos.pexels.com/video-files/5585939/5585939-hd_1920_1080_25fps.mp4",
      category: "branding",
      size: "col-span-12 md:col-span-6 row-span-1",
      imageHeight: "h-80",
    },
    {
      id: 6,
      name: "Toyota",
      video:
        "https://videos.pexels.com/video-files/4419251/4419251-hd_1920_1080_25fps.mp4",
      category: "uxui",
      size: "col-span-12 md:col-span-6 row-span-1",
      imageHeight: "h-80",
    },
    {
      id: 7,
      name: "Visa",
      video:
        "https://videos.pexels.com/video-files/3945147/3945147-uhd_2732_1440_25fps.mp4",
      category: "strategy",
      size: "col-span-12 md:col-span-3 row-span-1",
      imageHeight: "h-44",
    },
    {
      id: 8,
      name: "Tesla",
      video:
        "https://videos.pexels.com/video-files/27421705/12140050_2730_1440_30fps.mp4",
      category: "analytics",
      size: "col-span-12 md:col-span-3 row-span-1",
      imageHeight: "h-44",
    },
    {
      id: 9,
      name: "Nike",
      video:
        "https://videos.pexels.com/video-files/8533114/8533114-uhd_2560_1440_25fps.mp4",
      category: "marketing",
      size: "col-span-12 md:col-span-6 row-span-2",
      imageHeight: "h-96",
    },
  ];

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setActiveCategory("all");
  };

  const { tabCounts, categoryCounts } = useMemo(() => {
    const projectCount = projects.length;
    const clientCount = clients.length;

    const categoryCount: CategoryCounts = {
      all: { projects: projectCount, clients: clientCount },
      branding: {
        projects: projects.filter((p) => p.category === "branding").length,
        clients: clients.filter((c) => c.category === "branding").length,
      },
      uxui: {
        projects: projects.filter((p) => p.category === "uxui").length,
        clients: clients.filter((c) => c.category === "uxui").length,
      },
      development: {
        projects: projects.filter((p) => p.category === "development").length,
        clients: clients.filter((c) => c.category === "development").length,
      },
      strategy: {
        projects: projects.filter((p) => p.category === "strategy").length,
        clients: clients.filter((c) => c.category === "strategy").length,
      },
      marketing: {
        projects: projects.filter((p) => p.category === "marketing").length,
        clients: clients.filter((c) => c.category === "marketing").length,
      },
      research: {
        projects: projects.filter((p) => p.category === "research").length,
        clients: clients.filter((c) => c.category === "research").length,
      },
      analytics: {
        projects: projects.filter((p) => p.category === "analytics").length,
        clients: clients.filter((c) => c.category === "analytics").length,
      },
    };

    return {
      tabCounts: { projects: projectCount, clients: clientCount },
      categoryCounts: categoryCount,
    };
  }, []);

  const tabs = [
    { id: "projects" as const, name: t("tabs.projects"), count: tabCounts.projects },
    { id: "clients" as const, name: t("tabs.clients"), count: tabCounts.clients },
  ];

  const categories = [
    { id: "all" as const, name: t("categories.all"), count: categoryCounts.all[activeTab] },
    { id: "branding" as const, name: t("categories.branding"), count: categoryCounts.branding[activeTab] },
    { id: "uxui" as const, name: t("categories.uxui"), count: categoryCounts.uxui[activeTab] },
    { id: "development" as const, name: t("categories.development"), count: categoryCounts.development[activeTab] },
    { id: "strategy" as const, name: t("categories.strategy"), count: categoryCounts.strategy[activeTab] },
    { id: "marketing" as const, name: t("categories.marketing"), count: categoryCounts.marketing[activeTab] },
    { id: "research" as const, name: t("categories.research"), count: categoryCounts.research[activeTab] },
    { id: "analytics" as const, name: t("categories.analytics"), count: categoryCounts.analytics[activeTab] },
  ];

  const filteredItems = useMemo(() => {
    if (activeTab === "clients") {
      return clients.filter(
        (client) => activeCategory === "all" || client.category === activeCategory
      );
    }
    return projects.filter(
      (project) => activeCategory === "all" || project.category === activeCategory
    );
  }, [activeTab, activeCategory]);

  return (
    <div className="px-6 py-40 md:mx-auto md:px-16 2xl:w-4/5">
      {/* Main Navigation */}
      <div className="mb-12 flex flex-wrap items-center gap-8">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-2xl font-bold md:text-4xl ${
                activeTab === tab.id ? "border-b-2 border-black" : "text-gray-400"
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
              <span className="ms-1 align-super text-sm">{tab.count}</span>
            </motion.button>
            {index < tabs.length - 1 && (
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black p-2" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-12 flex flex-wrap gap-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 ${
              activeCategory === category.id ? "font-bold" : "text-gray-500"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
            <span className="ms-1 align-super text-xs text-gray-400">
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Content Grid */}
      <motion.div
        layout
        className={`grid grid-cols-1 gap-10 md:grid-cols-12 ${
          activeTab === "projects" ? "gap-y-10 md:gap-x-10" : ""
        }`}
      >
        <AnimatePresence mode="popLayout">
          {activeTab === "clients"
            ? filteredItems.map((client) => {
                const item = client as Client;
                return (
                  <motion.div
                    layout
                    key={`client-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="col-span-1 border p-4 mb-12 md:col-span-4 md:mb-0"
                  >
                    <div className="relative mb-6 h-32">
                      <Image
                        priority
                        height={100}
                        width={100}
                        src={`/${item.image}`}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold">{item.name}</h3>
                    <p className="leading-relaxed text-[#7b7b7b]">
                      {t(`clients.${item.id}.description`)}
                    </p>
                  </motion.div>
                );
              })
            : filteredItems.map((project) => {
                const item = project as Project;
                return (
                  <motion.div
                    layout
                    key={`project-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`${item.size}`}
                  >
                    <div className={`relative ${item.imageHeight} mb-4`}>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    </div>
                    <h3 className="mb-2 text-sm font-bold text-gray-600">
                      / {item.name}
                    </h3>
                    <h3 className="mb-2 text-xl font-bold">
                      {t(`projects.${item.id}.title`)}
                    </h3>
                    <p className="text-gray-600">
                      {t(`projects.${item.id}.description`)}
                    </p>
                  </motion.div>
                );
              })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Hero;