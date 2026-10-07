import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awesome Studio",
  description: "A full-service digital innovation partner",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // ۱. دریافت locale از Promise در Next.js 15
  const { locale } = await params;

  // ۲. اعتبارسنجی locale بدون استفاده از any
  const isValidLocale = (routing.locales as readonly string[]).includes(locale);
  if (!isValidLocale) {
    notFound();
  }

  // ۳. دریافت پیام‌های ترجمه مربوط به locale فعلی
  const messages = await getMessages();

  // ۴. تعیین جهت صفحه و فونت مناسب
  const isFa = locale === "fa";
  const dir = isFa ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}