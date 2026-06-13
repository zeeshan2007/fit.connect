import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import AnimatedSection from '@/components/AnimatedSection';
import { getFeaturedProfessionals } from '@/lib/professionals';
import AnimatedProfessionalCard from '@/components/ProfessionalCard';

export const metadata: Metadata = {
  title: 'FitHire — Find Certified Fitness Trainers & Dieticians in Rawalpindi, Pakistan',
  description: 'Browse and hire certified fitness trainers, nutritionists, and dieticians in Rawalpindi, Pakistan. Connect instantly via WhatsApp — no sign-up required.',
  keywords: [
    'fitness trainer Rawalpindi',
    'dietician Rawalpindi',
    'nutritionist Rawalpindi',
    'hire fitness trainer',
    'online dietician',
    'weight loss trainer Rawalpindi',
  ],
  alternates: {
    canonical: 'https://fit-hire.netlify.app/',
  },
  openGraph: {
    title: 'FitHire — Find Certified Fitness Trainers & Dieticians in Rawalpindi, Pakistan',
    description: 'Browse and hire certified fitness trainers, nutritionists, and dieticians in Rawalpindi, Pakistan. Connect instantly via WhatsApp — no sign-up required.',
    url: 'https://fit-hire.netlify.app/',
    type: 'website',
  },
};

export default function HomePage() {
  const featured = getFeaturedProfessionals(6);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Featured Professionals */}
      <section className="section dark:bg-card bg-card-light">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <span className="badge-accent text-xs mb-4 inline-block">Top Rated</span>
            <h2 className="section-heading">
              Featured <span className="text-accent">Professionals</span>
            </h2>
            <p className="dark:text-textSecondary text-textSecondary-light max-w-md mx-auto">
              Our highest-rated fitness trainers and dieticians, ready to help you achieve your goals.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <AnimatedProfessionalCard key={p.id} professional={p} index={i} />
            ))}
          </div>

          <AnimatedSection className="text-center mt-10 md:mt-12">
            <Link href="/browse" className="btn-primary">
              View All Professionals
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="section dark:bg-surface bg-surface-light">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center">
            <h2 className="section-heading mb-6">
              Ready to Start Your <span className="text-accent">Fitness Journey</span>?
            </h2>
            <p className="dark:text-textSecondary text-textSecondary-light max-w-lg mx-auto mb-8">
              Browse our curated list of professionals and connect via WhatsApp in minutes. 
              No sign-up, no payment hassle — just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse" className="btn-primary">
                Browse Professionals
              </Link>
              <Link href="/hire" className="btn-secondary">
                Hire Now
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
