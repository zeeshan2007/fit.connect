'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/hire', label: 'Hire Now' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      if (currentY > lastScrollY && currentY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'dark:bg-surface/80 bg-surface-light/80 backdrop-blur-xl border-b dark:border-border border-border-light'
            : 'bg-transparent'
        }`}
        animate={prefersReducedMotion ? {} : { y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-surface md:w-6 md:h-6">
                <path d="M6.5 6.5L17.5 17.5M6.5 6.5V12.5M6.5 6.5H12.5M17.5 17.5V11.5M17.5 17.5H11.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wider">
              Fit<span className="text-accent">Hire</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-sm uppercase tracking-widest transition-colors duration-300 hover:text-accent ${
                  pathname === link.href ? 'text-accent' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: Theme + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border dark:border-border border-border-light"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-5 h-0.5 dark:bg-textPrimary bg-textPrimary-light rounded-full block"
                animate={isMobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 dark:bg-textPrimary bg-textPrimary-light rounded-full block"
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 dark:bg-textPrimary bg-textPrimary-light rounded-full block"
                animate={isMobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 dark:bg-surface bg-surface-light border-b dark:border-border border-border-light"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`font-heading text-lg uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-300 ${
                      pathname === link.href
                        ? 'text-accent dark:bg-card bg-card-light'
                        : 'hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
