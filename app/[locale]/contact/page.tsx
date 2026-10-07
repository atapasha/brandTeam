"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "../navbar";
import Footer from "../footer";

const Contact = () => {
  const t = useTranslations("ContactPage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert(t("form.successAlert"));
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="relative px-6 pt-32 pb-20 md:px-16 2xl:w-4/5 mx-auto">
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-6"
          >
            {t("badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </section>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 bg-neutral-900 text-white dark:bg-neutral-900/80 dark:border dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("info.title")}
            </h2>
            <p className="text-neutral-400 mb-10 text-sm md:text-base leading-relaxed">
              {t("info.subtitle")}
            </p>

            <div className="space-y-8">
              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                  {t("info.email")}
                </span>
                <a
                  href="mailto:info@awestudio.ir"
                  className="text-lg font-medium hover:text-neutral-300 transition-colors"
                >
                  info@awestudio.ir
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                  {t("info.phone")}
                </span>
                <a
                  href="tel:+987130000000"
                  className="text-lg font-medium hover:text-neutral-300 transition-colors"
                  dir="ltr"
                >
                  +98 (71) 3000 0000
                </a>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                  {t("info.location")}
                </span>
                <p className="text-base text-neutral-300 leading-relaxed">
                  {t("info.address")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                  {t("form.nameLabel")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm outline-none transition-all focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                  {t("form.emailLabel")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm outline-none transition-all focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                {t("form.subjectLabel")}
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder={t("form.subjectPlaceholder")}
                className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm outline-none transition-all focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                {t("form.messageLabel")}
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form.messagePlaceholder")}
                className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3.5 text-sm outline-none transition-all focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold py-4 px-8 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? t("form.submitting") : t("form.submitButton")}
            </motion.button>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;