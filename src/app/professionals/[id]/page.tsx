import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProfessionalById } from '@/lib/professionals';
import ProfessionalProfileClient from './ProfessionalProfileClient';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = getProfessionalById(params.id);
  if (!p) {
    return {
      title: 'Professional Not Found | FitHire',
    };
  }

  if (params.id === 'ibrahim-ghafoor-khan') {
    return {
      title: 'Ibrahim Ghafoor Khan — Trainer in Rawalpindi | FitHire',
      description: 'Ibrahim Ghafoor Khan is a Certified Level 2 Fitness Trainer specializing in personalized fitness coaching, fat loss, muscle building, and workout programming in Rawalpindi, Pakistan. Book a session on FitHire.',
      keywords: [
        'Ibrahim Ghafoor Khan',
        'trainer in rawalpindi',
        'certified trainer pakistan',
        'fitness trainer rawalpindi',
        'Fat Loss Coaching',
        'Muscle Building',
        'Workout Programming',
        'Diet Planning',
        'Full Body Transformation'
      ],
      alternates: {
        canonical: 'https://fit-hire.netlify.app/professionals/ibrahim-ghafoor-khan',
      },
      openGraph: {
        title: 'Ibrahim Ghafoor Khan — Trainer in Rawalpindi | FitHire',
        description: 'Ibrahim Ghafoor Khan is a Certified Level 2 Fitness Trainer specializing in personalized fitness coaching, fat loss, muscle building, and workout programming in Rawalpindi, Pakistan. Book a session on FitHire.',
        url: 'https://fit-hire.netlify.app/professionals/ibrahim-ghafoor-khan',
        type: 'profile',
      },
    };
  }

  const typeText = p.category.toLowerCase();
  const specsText = p.specializations.join(', ');

  return {
    title: `${p.name} — ${p.category} in ${p.city} | FitHire`,
    description: `${p.name} is a certified ${typeText} offering ${specsText} in ${p.city}, Pakistan. Book a session on FitHire.`,
    keywords: [
      p.name,
      `${p.category.toLowerCase()} in ${p.city.toLowerCase()}`,
      `certified ${p.category.toLowerCase()} pakistan`,
      `fitness trainer ${p.city.toLowerCase()}`,
      ...p.specializations,
      ...p.certifications,
    ],
    alternates: {
      canonical: `https://fit-hire.netlify.app/professionals/${params.id}`,
    },
    openGraph: {
      title: `${p.name} — ${p.category} in ${p.city} | FitHire`,
      description: `${p.name} is a certified ${typeText} offering ${specsText} in ${p.city}, Pakistan. Book a session on FitHire.`,
      url: `https://fit-hire.netlify.app/professionals/${params.id}`,
      type: 'profile',
    },
  };
}

export default function ProfessionalProfilePage({ params }: PageProps) {
  const p = getProfessionalById(params.id);

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

  return <ProfessionalProfileClient professional={p} />;
}
