'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1], // --ease-out
      }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}

