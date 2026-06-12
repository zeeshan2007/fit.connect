'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { getProfessionalById } from '@/lib/professionals';
import { StarRating } from '@/components/ProfessionalCard';
import AnimatedSection from '@/components/AnimatedSection';

export default function ProfessionalProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const p = getProfessionalById(id);
  const prefersReducedMotion = useReducedMotion();

  if (!p) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center dark:bg-surface bg-surface-light">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="font-heading text-2xl uppercase tracking-wider mb-2">Professional Not Found</h1>
          <p className="dark:text-textSecondary text-textSecondary-light mb-6">
            The professional you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/browse" className="btn-primary">Browse All Professionals</Link>
        </div>
      </div>
    );
  }

  // Static testimonials for profile
  const profileTestimonials = [
    {
      name: 'Verified Client',
      text: `Great experience with ${p.name}. Very professional and knowledgeable. Highly recommended for anyone looking for expert guidance.`,
      rating: 5,
    },
    {
      name: 'Verified Client',
      text: `${p.name} really understands their field. The consultation was thorough and the advice was practical and easy to follow.`,
      rating: 5,
    },
  ];

  return (
    <div className="pt-20 md:pt-24 min-h-screen dark:bg-surface bg-surface-light">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* Back Button */}
        <AnimatedSection>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 dark:text-textSecondary text-textSecondary-light hover:text-accent transition-colors mb-8 text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Browse
          </Link>
        </AnimatedSection>

        {/* Profile Header */}
        <AnimatedSection>
          <div className="card p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              {/* Avatar */}
              <motion.div
                className="avatar-gradient w-28 h-28 md:w-36 md:h-36 text-3xl md:text-4xl flex-shrink-0 mx-auto md:mx-0"
                style={{
                  background: `linear-gradient(135deg, ${p.avatarGradient[0]}, ${p.avatarGradient[1]})`,
                }}
                initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {p.initials}
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="badge-accent text-xs">{p.category}</span>
                  <span className="badge-accent text-xs">{p.sessionType}</span>
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wider mb-2">
                  {p.name}
                </h1>

                <p className="dark:text-textSecondary text-textSecondary-light text-sm md:text-base mb-4">
                  {p.degree || p.experienceRaw}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                  <StarRating rating={p.rating} reviewCount={p.reviewCount} />
                  <div className="flex items-center gap-1.5 text-sm dark:text-textSecondary text-textSecondary-light">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {p.city} • {p.location}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-xs dark:text-textSecondary text-textSecondary-light uppercase tracking-wider">Per Session</div>
                    <div className="font-heading text-3xl font-bold text-accent">{p.feeFormatted}</div>
                  </div>
                  <Link
                    href={`/hire?professional=${encodeURIComponent(p.name)}`}
                    className="btn-primary text-lg px-8 py-4"
                  >
                    🏋️ Hire Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* About */}
          <AnimatedSection delay={0.1}>
            <div className="card p-6 md:p-8 h-full">
              <h2 className="font-heading text-lg uppercase tracking-wider font-bold text-accent mb-4">About</h2>
              <p className="dark:text-textSecondary text-textSecondary-light text-sm leading-relaxed">
                {p.bio}
              </p>

              {p.experience && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{p.experience} Years Experience</span>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Specializations */}
          <AnimatedSection delay={0.2}>
            <div className="card p-6 md:p-8 h-full">
              <h2 className="font-heading text-lg uppercase tracking-wider font-bold text-accent mb-4">Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {p.specializations.map((spec, i) => (
                  <span
                    key={i}
                    className="text-sm px-4 py-2 rounded-xl dark:bg-surface bg-gray-100 dark:text-textSecondary text-textSecondary-light border dark:border-border border-border-light"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Certifications */}
          <AnimatedSection delay={0.3}>
            <div className="card p-6 md:p-8 h-full">
              <h2 className="font-heading text-lg uppercase tracking-wider font-bold text-accent mb-4">Certifications</h2>
              <ul className="space-y-3">
                {p.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6F135" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="dark:text-textSecondary text-textSecondary-light">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Contact & Location */}
          <AnimatedSection delay={0.4}>
            <div className="card p-6 md:p-8 h-full">
              <h2 className="font-heading text-lg uppercase tracking-wider font-bold text-accent mb-4">Details</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="dark:text-textSecondary text-textSecondary-light text-xs uppercase tracking-wider">Location</div>
                    <div className="font-medium">{p.location}{p.locationDetail ? ` • ${p.locationDetail}` : ''}</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="dark:text-textSecondary text-textSecondary-light text-xs uppercase tracking-wider">Session Type</div>
                    <div className="font-medium">{p.sessionType}</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="dark:text-textSecondary text-textSecondary-light text-xs uppercase tracking-wider">Contact</div>
                    <div className="font-medium">{p.phone}</div>
                  </div>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Testimonials */}
        <AnimatedSection className="mt-8" delay={0.2}>
          <div className="card p-6 md:p-8">
            <h2 className="font-heading text-lg uppercase tracking-wider font-bold text-accent mb-6">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileTestimonials.map((t, i) => (
                <div key={i} className="dark:bg-surface bg-gray-50 rounded-xl p-5 border dark:border-border border-border-light">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#C6F135" stroke="#C6F135" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="dark:text-textSecondary text-textSecondary-light text-sm leading-relaxed mb-3">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="text-xs font-heading uppercase tracking-wider dark:text-textSecondary text-textSecondary-light">
                    — {t.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom CTA */}
        <AnimatedSection className="text-center mt-8" delay={0.3}>
          <Link
            href={`/hire?professional=${encodeURIComponent(p.name)}`}
            className="btn-primary text-lg px-10 py-4"
          >
            🏋️ Hire {p.name.split(' ')[0]} Now
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
