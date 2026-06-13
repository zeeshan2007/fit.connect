import React from 'react';
import { Metadata } from 'next';
import HireClient from './HireClient';

export const metadata: Metadata = {
  title: 'Hire Certified Fitness Trainers & Dieticians | FitHire',
  description:
    'Start your fitness journey today. Choose your goal, budget, and timing, and hire certified fitness trainers, nutritionists, and dieticians in Pakistan instantly via WhatsApp.',
  keywords: [
    'hire fitness trainer pakistan',
    'hire personal trainer lahore',
    'hire online dietician pakistan',
    'hire certified nutritionist islamabad',
    'weight loss trainer pakistan',
    'fit coach whatsapp pakistan',
  ],
};

export default function HirePage() {
  return <HireClient />;
}
