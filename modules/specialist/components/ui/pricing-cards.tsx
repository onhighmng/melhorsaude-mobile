import React, { useState } from "react";
import { TextShimmer } from './text-shimmer';
import { AnimatedText } from './animated-underline-text-one';

const SESSION_PRICING = [
  { maxSessions: 50, price: 1250 },
  { maxSessions: 100, price: 2500 },
  { maxSessions: 200, price: 4500 },
  { maxSessions: 300, price: 6500 },
  { maxSessions: 400, price: 9000 },
  { maxSessions: 500, price: 10500 },
  { maxSessions: 750, price: 15000 },
  { maxSessions: 1000, price: 20000 },
  { maxSessions: 1500, price: 28000 },
  { maxSessions: 2000, price: 35000 },
];

const SESSION_VALUES = [
  50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 
  600, 750, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000
];

const SEAT_PRICING = [
  { maxSeats: 10, price: 500 },
  { maxSeats: 25, price: 1000 },
  { maxSeats: 50, price: 1800 },
  { maxSeats: 100, price: 3200 },
  { maxSeats: 200, price: 5800 },
  { maxSeats: 500, price: 12500 },
  { maxSeats: 1000, price: 22000 },
  { maxSeats: 2000, price: 40000 },
];

const SEAT_VALUES = [
  10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 300, 400, 500, 
  750, 1000, 1500, 2000, 3000, 5000
];

const getPriceForSessions = (sessions: number): number | null => {
  if (sessions >= 3000) return null;
  const breakpoint = SESSION_PRICING.find((tier) => sessions <= tier.maxSessions);
  if (breakpoint) return breakpoint.price;
  const basePrice = 35000;
  const extraSessions = sessions - 2000;
  const extraUnits = Math.ceil(extraSessions / 500);
  return basePrice + extraUnits * 7000;
};

const getPriceForSeats = (seats: number): number | null => {
  if (seats >= 5000) return null;
  const breakpoint = SEAT_PRICING.find((tier) => seats <= tier.maxSeats);
  if (breakpoint) return breakpoint.price;
  const basePrice = 40000;
  const extraSeats = seats - 2000;
  const extraUnits = Math.ceil(extraSeats / 1000);
  return basePrice + extraUnits * 18000;
};

interface PricingCardsProps {
  onPurchaseSessions?: (sessions: number, price: number | null) => void;
  onPurchaseSeats?: (seats: number, price: number | null) => void;
}

export const PricingCards: React.FC<PricingCardsProps> = ({ onPurchaseSessions, onPurchaseSeats }) => {
  const [sessionIndex, setSessionIndex] = useState(1); // Default to 100 sessions
  const [seatIndex, setSeatIndex] = useState(2); // Default to 20 seats

  const sessions = SESSION_VALUES[sessionIndex];
  const sessionPrice = getPriceForSessions(sessions);

  const seats = SEAT_VALUES[seatIndex];
  const seatPrice = getPriceForSeats(seats);

  return (
    <section className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sessions Card */}
        <div className="rounded-xl border border-gray-200 p-8 bg-white relative select-none">
          <h2 className="text-sm font-semibold text-neutral-800 mb-2">Pacote de Sessões</h2>
          <div className="text-3xl font-bold text-black mb-6">{sessions.toLocaleString()} sessões</div>
          
          <TextShimmer 
            as="p"
            duration={2.5}
            spread={2}
            className="text-sm font-bold mb-3 [--base-color:#1e40af] [--base-gradient-color:#1e40af]"
          >
            Deslize para ajustar a quantidade
          </TextShimmer>
          
          <input
            type="range"
            min={0}
            max={SESSION_VALUES.length - 1}
            step={1}
            value={sessionIndex}
            onChange={(e) => setSessionIndex(Number(e.target.value))}
            className="w-full appearance-none h-3 rounded bg-gray-200 mb-8"
            style={{
              background: `linear-gradient(to right, #1e40af 0%, #1e40af ${
                (sessionIndex / (SESSION_VALUES.length - 1)) * 100
              }%, #E5E7EB ${(sessionIndex / (SESSION_VALUES.length - 1)) * 100}%, #E5E7EB 100%)`,
            }}
          />

          <style>{`
            input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 28px;
              height: 28px;
              background: #ffffff;
              border: 2px solid #E5E7EB;
              border-radius: 50%;
              cursor: pointer;
              margin-top: -1px;
              box-shadow: 0 1px 5px rgba(192, 192, 192, 0.5);
              position: relative;
            }
            input[type='range']::-moz-range-thumb {
              width: 26px;
              height: 26px;
              background: #ffffff;
              border: 2px solid #E5E7EB;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 1px 5px rgba(192, 192, 192, 0.5);
            }
          `}</style>

          <div className="mb-6">
            <div className="text-3xl font-bold text-black">
              {sessionPrice === null ? "Contacte-nos" : `${sessionPrice.toLocaleString()} MZN`}
            </div>
            {sessionPrice !== null && (
              <p className="text-sm text-gray-500 mt-1">pagamento único</p>
            )}
          </div>

          <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">
            {sessionPrice === null
              ? "Para mais de 3000 sessões, contacte-nos para uma solução personalizada."
              : "Garanta acesso contínuo aos especialistas nas 4 áreas vitais."}
          </p>

          <div 
            className="flex justify-center cursor-pointer"
            onClick={() => onPurchaseSessions?.(sessions, sessionPrice)}
          >
            <AnimatedText 
              text={sessionPrice === null ? "Contacte-nos" : "Adquirir pacote"}
              textClassName="text-2xl font-bold text-black"
              underlineClassName="text-blue-700"
              underlineDuration={2}
            />
          </div>
        </div>

        {/* Seats Card */}
        <div className="rounded-xl border border-gray-200 p-8 bg-white relative select-none">
          <h2 className="text-sm font-semibold text-neutral-800 mb-2">Códigos de Acesso</h2>
          <div className="text-3xl font-bold text-black mb-6">{seats.toLocaleString()} colaboradores</div>
          
          <TextShimmer 
            as="p"
            duration={2.5}
            spread={2}
            className="text-sm font-bold mb-3 [--base-color:#1e40af] [--base-gradient-color:#1e40af]"
          >
            Deslize para ajustar a quantidade
          </TextShimmer>
          
          <input
            type="range"
            min={0}
            max={SEAT_VALUES.length - 1}
            step={1}
            value={seatIndex}
            onChange={(e) => setSeatIndex(Number(e.target.value))}
            className="w-full appearance-none h-3 rounded bg-gray-200 mb-8"
            style={{
              background: `linear-gradient(to right, #1e40af 0%, #1e40af ${
                (seatIndex / (SEAT_VALUES.length - 1)) * 100
              }%, #E5E7EB ${(seatIndex / (SEAT_VALUES.length - 1)) * 100}%, #E5E7EB 100%)`,
            }}
          />

          <div className="mb-6">
            <div className="text-3xl font-bold text-black">
              {seatPrice === null ? "Contacte-nos" : `${seatPrice.toLocaleString()} MZN`}
            </div>
            {seatPrice !== null && (
              <p className="text-sm text-gray-500 mt-1">pagamento único</p>
            )}
          </div>

          <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium">
            {seatPrice === null
              ? "Para mais de 5000 colaboradores, contacte-nos para uma solução empresarial."
              : "Cada novo acesso é um convite oficial para um futuro melhor."}
          </p>

          <div 
            className="flex justify-center cursor-pointer"
            onClick={() => onPurchaseSeats?.(seats, seatPrice)}
          >
            <AnimatedText 
              text={seatPrice === null ? "Contacte-nos" : "Adquirir códigos"}
              textClassName="text-2xl font-bold text-black"
              underlineClassName="text-blue-700"
              underlineDuration={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
};