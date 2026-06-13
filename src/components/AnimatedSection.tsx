'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  trigger?: 'view' | 'mount';
}

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  trigger = 'mount',
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const animateState = trigger === 'mount' ? 'visible' : (isInView ? 'visible' : 'hidden');

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={animateState}
      variants={directionVariants[direction]}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
