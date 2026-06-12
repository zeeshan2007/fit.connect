'use client';

import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const testimonials = [
  {
    name: 'Ahmed Khan',
    city: 'Lahore',
    rating: 5,
    text: 'Found an amazing nutritionist through FitHire. The WhatsApp connection made everything so easy — booked my first session within minutes!',
    goal: 'Weight Loss',
  },
  {
    name: 'Fatima Ali',
    city: 'Islamabad',
    rating: 5,
    text: 'As a busy mom, I needed an online dietician. FitHire helped me find the perfect professional who understood my needs and schedule.',
    goal: 'Diet Plan',
  },
  {
    name: 'Hassan Raza',
    city: 'Karachi',
    rating: 5,
    text: 'The platform is incredibly easy to use. Browsed trainers, compared prices, and connected — all in under 5 minutes. Highly recommended!',
    goal: 'Muscle Gain',
  },
  {
    name: 'Ayesha Malik',
    city: 'Lahore',
    rating: 5,
    text: 'My rehabilitation trainer has been incredible. FitHire made it possible to find a specialist when I needed one most. Grateful for this platform!',
    goal: 'Rehabilitation',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="section dark:bg-card bg-card-light">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="badge-accent text-xs mb-4 inline-block">Testimonials</span>
          <h2 className="section-heading">
            What Our <span className="text-accent">Clients</span> Say
          </h2>
        </AnimatedSection>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="card p-6 md:p-8 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#C6F135" stroke="#C6F135" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="dark:text-textSecondary text-textSecondary-light text-sm md:text-base leading-relaxed flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t dark:border-border border-border-light">
                  <div>
                    <div className="font-heading text-sm font-bold uppercase tracking-wider">{t.name}</div>
                    <div className="text-xs dark:text-textSecondary text-textSecondary-light mt-0.5">{t.city}</div>
                  </div>
                  <span className="badge-accent text-[10px]">{t.goal}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
