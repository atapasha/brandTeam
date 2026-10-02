'use client'

import React from "react";
import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator";

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const formatNumber = (num: string): string => {
    if (num.includes("%")) {
      return num;
    }
    if (num.includes("$")) {
      return `$${num.replace(/[^0-9]/g, "")}+`;
    }
    return `${num.replace(/[^0-9]/g, "")}+`;
  };

  return (
    <div ref={cardRef} className="bg-gray-100 p-6 shadow-sm">
      <div className="h-14 ">
        <div
          className={`text-5xl font-bold mb-2 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {formatNumber(number)}
        </div>
      </div>
      <div
        className={`text-[#7b7b7b] text-sm transform transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { number: "100", label: "Clients from 17 Countries" },
    { number: "280", label: "Millions raised for our clients" },
    { number: "90", label: "Of our clients come back" },
    { number: "98", label: "Net Promoting Score" },
  ];

  return (
    <div
      className="mx-auto   
     2xl:w-4/5 md:px-16

    
    
    px-6 "
    >
      <Separator className="my-16" />

      <div className="flex flex-col md:flex-row items-start justify-between ">
        <div className="md:w-1/4 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold">our numbers:</h2>
          <p className="text-gray-500 mt-4">
            With every project we take on, we strive to deliver the best results
            for our clients.
          </p>
        </div>
        <div className="md:w-2/4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-16" />
    </div>
  );
};

export default Stats;
