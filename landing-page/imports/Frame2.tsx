const imgIPhone15Plus = "/landing-assets/5fc017ef8e4d2a286435295982433ca4808afe31.png";
const imgAddScreen = "/landing-assets/2b75bd19a0bc23459f171b2e169d2b80f6fca353.png";
// DISABLED: import from 'motion/react';
import { useRef } from "react";

export default function Frame() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div className="relative size-full" ref={ref}>
      <div 
        className="absolute h-[594px] left-0 top-0 w-[291px]" 
        data-name="iPhone15Plus"

        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}

      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgIPhone15Plus} />
      </div>
      <div 
        className="absolute h-[579.6px] left-[11.4px] rounded-[36.9px] top-[7.2px] w-[267.9px]" 
        data-name="Add Screen"

        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}

      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[36.9px] size-full" src={imgAddScreen} />
      </div>
    </div>
  );
}