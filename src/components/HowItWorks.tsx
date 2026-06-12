import React from 'react';
import AnimatedSection from './AnimatedSection';

const steps = [
  {
    number: '01',
    title: 'Browse',
    description: 'Explore our curated list of certified fitness trainers and dieticians across Pakistan.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose',
    description: 'Compare profiles, specializations, pricing, and ratings to find your perfect match.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Connect',
    description: 'Fill a quick form and connect instantly via WhatsApp. No sign-up, no hassle.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="section dark:bg-surface bg-surface-light">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="badge-accent text-xs mb-4 inline-block">Simple Process</span>
          <h2 className="section-heading">
            How It <span className="text-accent">Works</span>
          </h2>
          <p className="dark:text-textSecondary text-textSecondary-light max-w-md mx-auto">
            Get connected with your ideal fitness professional in three simple steps.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.12}>
              <div className="card p-6 md:p-8 text-center group hover:border-accent/30 transition-all duration-300">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-surface transition-all duration-300">
                  {step.icon}
                </div>
                {/* Step Number */}
                <div className="font-heading text-5xl font-bold text-accent/20 mb-2">{step.number}</div>
                {/* Title */}
                <h3 className="font-heading text-xl uppercase tracking-wider font-bold mb-3">{step.title}</h3>
                {/* Description */}
                <p className="dark:text-textSecondary text-textSecondary-light text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
