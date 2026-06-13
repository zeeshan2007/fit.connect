'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Professional } from '@/types';

interface ProfessionalCardProps {
  professional: Professional;
  index?: number;
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? '#C6F135' : 'none'}
          stroke={star <= Math.round(rating) ? '#C6F135' : 'currentColor'}
          strokeWidth="2"
          className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      {reviewCount !== undefined && (
        <span className="text-xs dark:text-textSecondary text-textSecondary-light ml-1">
          {rating} ({reviewCount})
        </span>
      )}
    </div>
  );
}

function ProfessionalCard({ professional: p, index = 0 }: ProfessionalCardProps) {
  return (
    <div className="card p-5 md:p-6 h-full flex flex-col group relative">
      {/* Top Section: Avatar + Info */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <Link href={`/professionals/${p.id}`} className="flex-shrink-0">
          <div
            className="avatar-gradient w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full text-lg md:text-xl"
            style={{
              background: `linear-gradient(135deg, ${p.avatarGradient[0]}, ${p.avatarGradient[1]})`,
            }}
          >
            {p.initials}
          </div>
        </Link>

        {/* Name & Category */}
        <div className="flex-1 min-w-0">
          <Link href={`/professionals/${p.id}`} className="block group/title">
            <h3 className="font-heading text-lg md:text-xl font-bold uppercase tracking-wide truncate group-hover/title:text-accent transition-colors duration-300">
              {p.name}
            </h3>
          </Link>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="badge-accent text-[10px]">{p.category}</span>
            <span className="badge-accent text-[10px]">{p.sessionType}</span>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.specializations.slice(0, 3).map((spec, i) => (
          <span
            key={i}
            className="text-[11px] px-2.5 py-1 rounded-full dark:bg-surface bg-gray-100 dark:text-textSecondary text-textSecondary-light border dark:border-border border-border-light"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Meta Row */}
      <div className="mt-auto space-y-3">
        <StarRating rating={p.rating} reviewCount={p.reviewCount} />

        <div className="flex items-center justify-between pt-3 border-t dark:border-border border-border-light">
          <div className="flex items-center gap-1.5 text-xs dark:text-textSecondary text-textSecondary-light">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {p.city}
          </div>
          {/* Price (fee) hidden */}
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Link href={`/professionals/${p.id}`} className="btn-secondary flex-1 text-xs py-2 text-center">
            View Profile
          </Link>
          <Link
            href={`/hire?professional=${encodeURIComponent(p.name)}`}
            className="btn-primary flex-1 text-xs py-2 text-center"
          >
            Hire Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AnimatedProfessionalCard({ professional, index = 0 }: ProfessionalCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <ProfessionalCard professional={professional} index={index} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <ProfessionalCard professional={professional} index={index} />
    </motion.div>
  );
}

export { StarRating };
