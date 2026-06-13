import React from 'react';
import { Metadata } from 'next';
import BrowseClient from './BrowseClient';

export const metadata: Metadata = {
  title: 'Browse Certified Fitness Trainers & Nutritionists in Pakistan | FitHire',
  description:
    'Search and connect with the best certified gym trainers, dieticians, and nutritionists in Lahore, Karachi, Islamabad, and across Pakistan. Filter by city, category, and session type.',
  keywords: [
    'fitness trainer Pakistan',
    'certified trainer Lahore',
    'nutritionist Karachi',
    'dietician Islamabad',
    'personal fitness coach Pakistan',
    'hire nutritionist online',
    'gym coach Lahore',
    'online fitness trainer Pakistan',
  ],
};

export default function BrowsePage() {
  return <BrowseClient />;
}
