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

  const categoryText = p.category === 'Both' ? 'Fitness Trainer & Dietician' : `${p.category}`;
  
  return {
    title: `${p.name} - Certified ${categoryText} in ${p.city} | FitHire`,
    description: p.bio,
    keywords: [
      p.name,
      `${p.category.toLowerCase()} in ${p.city.toLowerCase()}`,
      `certified ${p.category.toLowerCase()} pakistan`,
      `fitness trainer ${p.city.toLowerCase()}`,
      ...p.specializations,
      ...p.certifications,
    ],
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
