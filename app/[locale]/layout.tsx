import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Vazirmatn } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css"; // مسیر globals.css را چک کنید (احتمالاً به یک لول عقب‌تر احتیاج دارد)

 

 
export const metadata: Metadata = {
  title: "Awesome Studio",
  description: "A full-service digital innovation partner",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // ۱. دریافت locale از Promise در Next.js 15
  const { locale } = await params;

  // ۲. اعتبارسنحش locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // ۳. دریافت پیام‌های ترجمه مربوط به locale فعلی
  const messages = await getMessages();

  // ۴. تعیین جهت صفحه و فونت مناسب
  const isFa = locale === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
 
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