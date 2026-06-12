'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function ThankYouPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pt-20 md:pt-24 min-h-screen dark:bg-surface bg-surface-light flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center py-16">
        {/* Animated Checkmark */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center"
          initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.4,
          }}
        >
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C6F135"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? {} : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h1 className="font-heading text-3xl md:text-display-sm font-bold uppercase tracking-wider mb-4">
            Thank <span className="text-accent">You!</span>
          </h1>

          <p className="dark:text-textSecondary text-textSecondary-light mb-3 text-base leading-relaxed">
            Your hiring request has been sent via WhatsApp. Our team will review your 
            request and connect you with the right professional shortly.
          </p>

          <p className="dark:text-textSecondary text-textSecondary-light mb-8 text-sm">
            If WhatsApp didn&apos;t open, you can reach us directly at{' '}
            <a
              href="https://wa.me/923323145866"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              +92 332 314 5866
            </a>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link href="/browse" className="btn-primary">
            Browse More Professionals
          </Link>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </motion.div>

        {/* Decorative dots */}
        <motion.div
          className="mt-16 flex justify-center gap-2"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-accent/30"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
