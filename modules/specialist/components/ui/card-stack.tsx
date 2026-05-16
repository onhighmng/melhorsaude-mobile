"use client";
import { useEffect, useState } from "react";
// DISABLED: import from 'motion/react';

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  color: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-full">
      {cards.map((card, index) => {
        return (
          <div
            key={card.id}
            className="absolute rounded-3xl p-8 shadow-sm border border-neutral-200 flex flex-col justify-between w-full h-60"
            style={{
              transformOrigin: "top center",
              backgroundColor: card.color,
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-gray-700">
              {card.content}
            </div>
            <div>
              <p className="text-gray-900 font-medium">
                {card.name}
              </p>
              <p className="text-gray-600 font-normal">
                {card.designation}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
