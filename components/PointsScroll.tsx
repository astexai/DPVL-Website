"use client";

import { motion } from "framer-motion";

export default function AutoScrollComponent() {
  const items = Array(5).fill("POINTS TABLE");

  return (
    <div className="relative z-30 w-full bg-white py-8">
      <motion.div
        className="flex w-max gap-20"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
      >
        {items.concat(items).map((text, i) => (
          <span
            key={i}
            className="text-4xl font-bold text-pink-500 whitespace-nowrap"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
