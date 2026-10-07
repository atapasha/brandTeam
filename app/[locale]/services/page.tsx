import { Separator } from "@/components/ui/separator";
import Navbar from "../navbar";
import Brands from "./brands";
import Image from "next/image";
import Process from "./process";
import Impact from "./impact";
import Industries from "./industries";
import Footer from "../footer";
import { useTranslations } from "next-intl";

 

const Services = () => {
  const t = useTranslations("ServicesPage");

  // دریافت آرایه خدمات از فایل JSON ترجمه
  const serviceKeys = ["ai", "branding", "digitalProducts", "websites", "content", "development"];

  const serviceImages: Record<string, string> = {
    ai: "/ai.jpg",
    branding: "/adidas.jpg",
    digitalProducts: "/nord.jpg",
    websites: "/airbnb.jpg",
    content: "/paypal.jpg",
    development: "/redbull.jpg",
  };

  return (
    <div className="md:min-h-screen bg-white">
      <Navbar />

      {/* hero section */}
      <div className="pt-32 pb-20 px-6 mx-auto 2xl:w-4/5 md:px-16">
        <div className="mx-auto flex items-center">
          <div className="md:w-2/3">
            <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold mb-8">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-neutral-500">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <Brands />
      <Separator className="my-16" />

      {/* services section */}
      <div className="md:py-20 px-6 mx-auto 2xl:w-4/5 md:px-16">
        <h2 className="text-xl font-bold text-[#7b7b7b] mb-10">
          {t("sectionTitle")}
        </h2>

        <div className="space-y-16 md:space-y-32">
          {serviceKeys.map((key) => {
            const benefits = t.raw(`items.${key}.benefits`) as string[];

            return (
              <div
                key={key}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {/* image section */}
                <div className="w-full">
                  <Image
                    priority
                    width={1200}
                    height={675}
                    src={serviceImages[key]}
                    alt={t(`items.${key}.title`)}
                    className="shadow-lg md:w-[640px] h-[400px] object-cover"
                  />
                </div>

                {/* content section */}
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-8">
                    {t(`items.${key}.title`)}
                  </h2>
                  <p className="text-[#7b7b7b] mb-12">
                    {t(`items.${key}.description`)}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, benefitIndex) => (
                      <div
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                        key={benefitIndex}
                      >
                        <span className="text-[#7b7b7b]">/ {benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Process />
      <Impact />
      <Industries />
      <Footer />
    </div>
  );
};

export default Services;