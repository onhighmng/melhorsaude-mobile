"use client";

import { buttonVariants } from "./button";
import { Label } from "./label";
import { Switch } from "./switch";
import { useMediaQuery } from "../../hooks/use-media-query";
import { cn } from "./utils";
// DISABLED: import from 'motion/react';
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  onSelect: () => void;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchContainerRef.current) {
      const rect = switchContainerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#10b981",
          "#14b8a6",
          "#06b6d4",
          "#0891b2",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl text-gray-900 font-manrope font-bold">
          {title}
        </h2>
        <p className="text-gray-600 text-lg whitespace-pre-line font-inter">
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10 items-center gap-3">
        <span className="text-gray-700 font-inter font-bold">
          Pagamento Único
        </span>
        <div ref={switchContainerRef} className="relative inline-flex items-center cursor-pointer">
          <Label>
            <Switch
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </div>
        <span className="text-gray-700 font-inter font-bold">
          Subscrição Anual <span className="text-emerald-600">(Poupe 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}

            whileInView={
              isDesktop
                ? {
                  y: plan.isPopular ? -20 : 0,
                  opacity: 1,
                  x: index === 2 ? -30 : index === 0 ? 30 : 0,
                  scale: index === 0 || index === 2 ? 0.94 : 1.0,
                }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border p-6 bg-white text-center lg:flex lg:flex-col lg:justify-center relative`,
              plan.isPopular ? "border-emerald-500 border-2 shadow-lg" : "border-gray-200",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0"
                : "z-10"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-emerald-600 py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-white h-4 w-4 fill-current" />
                <span className="text-white ml-1 font-sans font-manrope font-bold">
                  Popular
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base text-gray-600 font-inter font-bold">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl text-gray-900 font-manrope font-bold">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    formatter={(value) => `${value}€`}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                  />
                </span>
              </div>

              <p className="text-xs leading-5 text-gray-500 mt-2">
                {isMonthly ? "pagamento único" : "por ano"}
              </p>

              <ul className="mt-8 gap-3 flex flex-col">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-left text-gray-700 font-inter">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-6 border-gray-200" />

              <button
                onClick={plan.onSelect}
                className={cn(
                  "group relative w-full gap-2 overflow-hidden text-lg tracking-tight rounded-full py-3 px-6 font-manrope font-bold",
                  "transform-gpu transition-all duration-300 ease-out",
                  plan.isPopular
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl hover:scale-105"
                    : "bg-white border-2 border-gray-200 text-gray-900 hover:border-emerald-600 hover:bg-emerald-50"
                )}
              >
                {plan.buttonText}
              </button>
              <p className="mt-4 text-xs leading-5 text-gray-500 font-inter">
                {plan.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}