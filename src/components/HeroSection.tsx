'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const content = (
    <>
      {/* Badge */}
      <div className="badge-accent text-xs md:text-sm mb-6">
        🇵🇰 Pakistan&apos;s #1 Fitness Professional Platform
      </div>

      {/* Heading */}
      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-display font-bold uppercase leading-none tracking-tight mb-6">
        Find Your
        <br />
        <span className="text-accent">Perfect</span> Fitness
        <br />
        Professional
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-body-lg dark:text-textSecondary text-textSecondary-light max-w-xl mb-8">
        Browse certified trainers, nutritionists, and dieticians across Pakistan. 
        Connect instantly via WhatsApp — no sign-up required.
      </p>

      {/* Search + CTA */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-textSecondary text-textSecondary-light"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trainers, dieticians..."
            className="input pl-11"
          />
        </div>
        <Link
          href={search ? `/browse?search=${encodeURIComponent(search)}` : '/browse'}
          className="btn-primary whitespace-nowrap"
        >
          Browse All
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 md:gap-10 mt-10 md:mt-12">
        {[
          { number: '21+', label: 'Professionals' },
          { number: '6+', label: 'Cities' },
          { number: '500+', label: 'Consultations' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="font-heading text-2xl md:text-3xl font-bold text-accent">{stat.number}</div>
            <div className="text-xs uppercase tracking-widest dark:text-textSecondary text-textSecondary-light mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-surface dark:via-surface dark:to-card bg-gradient-to-br from-surface-light via-surface-light to-card-light" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-surface dark:via-surface dark:to-card bg-gradient-to-br from-surface-light via-surface-light to-card-light" />
      <motion.div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/3 blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="badge-accent text-xs md:text-sm mb-6">
            🇵🇰 Pakistan&apos;s #1 Fitness Professional Platform
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-display font-bold uppercase leading-none tracking-tight mb-6"
        >
          Find Your
          <br />
          <span className="text-accent">Perfect</span> Fitness
          <br />
          Professional
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-body-lg dark:text-textSecondary text-textSecondary-light max-w-xl mb-8"
        >
          Browse certified trainers, nutritionists, and dieticians across Pakistan. 
          Connect instantly via WhatsApp — no sign-up required.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-textSecondary text-textSecondary-light"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trainers, dieticians..."
              className="input pl-11"
            />
          </div>
          <Link
            href={search ? `/browse?search=${encodeURIComponent(search)}` : '/browse'}
            className="btn-primary whitespace-nowrap"
          >
            Browse All
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-6 md:gap-10 mt-10 md:mt-12">
          {[
            { number: '21+', label: 'Professionals' },
            { number: '6+', label: 'Cities' },
            { number: '500+', label: 'Consultations' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-2xl md:text-3xl font-bold text-accent">{stat.number}</div>
              <div className="text-xs uppercase tracking-widest dark:text-textSecondary text-textSecondary-light mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
