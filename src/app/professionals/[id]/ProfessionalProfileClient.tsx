'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Award, 
  MapPin, 
  Globe, 
  Star, 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  User, 
  Activity, 
  Phone, 
  Check, 
  Sparkles,
  MessageSquare,
  Calendar,
  Building
} from 'lucide-react';
import { Professional } from '@/types';
import { StarRating } from '@/components/ProfessionalCard';
import AnimatedSection from '@/components/AnimatedSection';

interface ProfessionalProfileClientProps {
  professional: Professional;
}

export default function ProfessionalProfileClient({ professional: p }: ProfessionalProfileClientProps) {
  const prefersReducedMotion = useReducedMotion();

  // Dynamically generate offered plans based on their category
  const getOfferedPlans = (category: string) => {
    switch (category) {
      case 'Trainer':
        return [
          { name: 'Strength & Hypertrophy Program', desc: 'Custom weight training routine optimized for muscle growth and physical strength.' },
          { name: 'Cardiovascular Conditioning', desc: 'High-intensity interval training (HIIT) and aerobic endurance planning.' },
          { name: 'Functional Fitness & Posture', desc: 'Workouts aimed at core stability, mobility, and correcting muscular imbalances.' },
          { name: 'Home Workout Solutions', desc: 'Bodyweight or minimal-equipment training guides tailored for home spaces.' }
        ];
      case 'Dietician':
        return [
          { name: 'Personalized Weight Loss/Gain Diet', desc: 'Calculated caloric and macronutrient meal plans matching target body goals.' },
          { name: 'Clinical Nutrition Management', desc: 'Specialized dietary guidance for conditions like PCOS, Diabetes, and Hypertension.' },
          { name: 'Macro Tracking & Nutrition Coaching', desc: 'Step-by-step coaching to understand meal compositions and portion controls.' },
          { name: 'Meal Prep & Weekly Grocery Guides', desc: 'Easy-to-follow meal prep systems, recipes, and shopping checklists.' }
        ];
      case 'Both':
      default:
        return [
          { name: 'Elite Integrated Diet & Workout Plan', desc: 'Full-stack combination of daily custom nutrition tracking and exercise planning.' },
          { name: 'Weight Recomposition Blueprint', desc: 'Targeted strategies to burn body fat while simultaneously building muscle.' },
          { name: 'Athletic Conditioning & Meal Guide', desc: 'Performance-driven training schedules accompanied by active recovery diet charts.' },
          { name: 'Lifestyle Transformation Coaching', desc: 'Long-term healthy habits building covering sleep, hydration, diet, and training.' }
        ];
    }
  };

  const plans = getOfferedPlans(p.category);

  // Static testimonials/reviews for profile
  const profileTestimonials = [
    {
      name: 'Ahmed Shah',
      text: `Excellent coaching from ${p.name}. The workout routine is challenging but highly structured, and the constant motivation keeps me going.`,
      rating: 5,
      date: '2 weeks ago'
    },
    {
      name: 'Sobia Malik',
      text: `Highly professional and knowledgeable! The nutrition plan given by ${p.name} was very simple to incorporate into my busy office schedule.`,
      rating: 5,
      date: '1 month ago'
    },
  ];

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 dark:bg-surface bg-surface-light text-textPrimary-light dark:text-textPrimary font-body transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        
        {/* Back Link */}
        <AnimatedSection className="mb-8" trigger="mount">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm text-textSecondary dark:text-textSecondary hover:text-accent transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Browse Professionals
          </Link>
        </AnimatedSection>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =========================================================================
              LEFT COLUMN - Avatar, Quick Stats, CTA Action Buttons
              ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Avatar & Neon Frame */}
            <AnimatedSection trigger="mount">
              <div className="card p-6 flex flex-col items-center text-center relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
                {/* Accent glow behind avatar */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-accent/10 blur-2xl" />
                
                {/* Circular Avatar Frame */}
                <motion.div
                  className="w-40 h-40 rounded-full flex items-center justify-center text-4xl md:text-5xl font-heading font-extrabold shadow-lg relative z-10 border-2 dark:border-border border-border-light group-hover:border-accent transition-colors duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${p.avatarGradient[0]}, ${p.avatarGradient[1]})`,
                  }}
                  initial={prefersReducedMotion ? {} : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <span className="text-surface font-black drop-shadow-md tracking-wider">
                    {p.initials}
                  </span>
                </motion.div>
                
                {/* Meta details under avatar */}
                <h2 className="font-heading text-2xl font-bold uppercase tracking-wider mt-5 text-textPrimary-light dark:text-textPrimary">
                  {p.name}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  <span className="badge-accent text-[11px] font-semibold">{p.category}</span>
                  <span className="badge-accent text-[11px] font-semibold">{p.sessionType}</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Quick Metrics / Stats Card */}
            <AnimatedSection delay={0.1} trigger="mount">
              <div className="card p-6 space-y-4 hover:border-accent/20 transition-all">
                <h3 className="font-heading text-sm uppercase tracking-widest text-accent font-bold border-b dark:border-border border-border-light pb-2">
                  Key Metrics
                </h3>
                
                <ul className="space-y-4">
                  {/* Experience Metric */}
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl dark:bg-surface bg-gray-100 flex items-center justify-center text-accent">
                      <Award size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-textSecondary dark:text-textSecondary">Experience</span>
                      <span className="text-sm font-semibold">
                        {p.experience ? `${p.experience} Years` : 'Highly Experienced'}
                      </span>
                    </div>
                  </li>

                  {/* Session Model Metric */}
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl dark:bg-surface bg-gray-100 flex items-center justify-center text-accent">
                      <Globe size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-textSecondary dark:text-textSecondary">Session Model</span>
                      <span className="text-sm font-semibold">{p.sessionType} Coaching</span>
                    </div>
                  </li>

                  {/* City Metric */}
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl dark:bg-surface bg-gray-100 flex items-center justify-center text-accent">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-textSecondary dark:text-textSecondary">Primary City</span>
                      <span className="text-sm font-semibold">{p.city}</span>
                    </div>
                  </li>

                  {/* Rating Metric */}
                  <li className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl dark:bg-surface bg-gray-100 flex items-center justify-center text-accent">
                      <Star size={18} className="fill-accent text-accent" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-textSecondary dark:text-textSecondary">Satisfaction</span>
                      <span className="text-sm font-semibold flex items-center gap-1">
                        {p.rating} / 5.0 ({p.reviewCount} Reviews)
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Bottom Left: Action CTA Buttons */}
            <AnimatedSection delay={0.2} trigger="mount">
              <div className="card p-6 space-y-3">
                <Link
                  href={`/hire?professional=${encodeURIComponent(p.name)}`}
                  className="btn-primary w-full text-center text-sm py-3.5 rounded-xl shadow-accent-glow font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
                >
                  🏋️ Hire {p.name.split(' ')[0]} Now
                </Link>
                
                <Link
                  href="/browse"
                  className="btn-secondary w-full text-center text-sm py-3 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent/5 transition-all"
                >
                  <ArrowLeft size={16} />
                  Back to Listing
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* =========================================================================
              RIGHT COLUMN - Bio, Specializations, Plans Offered, Reviews
              ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Typography */}
            <AnimatedSection trigger="mount">
              <div className="card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-accent">
                <div>
                  <span className="badge-accent text-xs font-semibold mb-2 inline-block">Certified Expert</span>
                  <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider text-textPrimary-light dark:text-textPrimary mb-2">
                    {p.name}
                  </h1>
                  <p className="text-textSecondary dark:text-textSecondary text-sm md:text-base font-semibold flex items-center gap-2">
                    <Sparkles size={16} className="text-accent" />
                    {p.degree || p.experienceRaw}
                  </p>
                </div>
                
                {/* Right Header Badges */}
                <div className="flex flex-col gap-2 items-start md:items-end flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-xs text-textSecondary dark:text-textSecondary">
                    <Building size={14} />
                    <span>{p.location}</span>
                  </div>
                  {p.locationDetail && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-surface dark:bg-card border dark:border-border border-border-light text-textSecondary font-semibold">
                      {p.locationDetail}
                    </span>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* About / Bio Section */}
            <AnimatedSection delay={0.1} trigger="mount">
              <div className="card p-6 md:p-8 hover:border-accent/10 transition-all">
                <div className="flex items-center gap-2.5 mb-4 border-b dark:border-border border-border-light pb-3">
                  <User size={20} className="text-accent" />
                  <h3 className="font-heading text-lg uppercase tracking-wider font-bold">About {p.name.split(' ')[0]}</h3>
                </div>
                <p className="dark:text-textSecondary text-textSecondary-light text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {p.bio}
                </p>
              </div>
            </AnimatedSection>

            {/* Specialization Tags */}
            <AnimatedSection delay={0.2} trigger="mount">
              <div className="card p-6 md:p-8 hover:border-accent/10 transition-all">
                <div className="flex items-center gap-2.5 mb-4 border-b dark:border-border border-border-light pb-3">
                  <Activity size={20} className="text-accent" />
                  <h3 className="font-heading text-lg uppercase tracking-wider font-bold">Specializations</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs px-4 py-2.5 rounded-xl bg-accent/5 dark:text-accent text-accent font-semibold border border-accent/25 hover:border-accent hover:bg-accent/10 transition-all duration-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Dynamic Plans Offered */}
            <AnimatedSection delay={0.3} trigger="mount">
              <div className="card p-6 md:p-8 hover:border-accent/10 transition-all">
                <div className="flex items-center gap-2.5 mb-4 border-b dark:border-border border-border-light pb-3">
                  <FileText size={20} className="text-accent" />
                  <h3 className="font-heading text-lg uppercase tracking-wider font-bold">Diet/Workout Plans Offered</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan, i) => (
                    <div 
                      key={i} 
                      className="p-5 rounded-2xl dark:bg-surface bg-gray-50 border dark:border-border border-border-light flex gap-3.5 hover:border-accent/25 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-accent">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 className="font-heading text-sm uppercase tracking-wide font-bold mb-1.5 text-textPrimary-light dark:text-textPrimary">
                          {plan.name}
                        </h4>
                        <p className="text-textSecondary dark:text-textSecondary text-xs leading-relaxed">
                          {plan.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Client Reviews Section */}
            <AnimatedSection delay={0.4} trigger="mount">
              <div className="card p-6 md:p-8 hover:border-accent/10 transition-all">
                <div className="flex items-center gap-2.5 mb-6 border-b dark:border-border border-border-light pb-3">
                  <Star size={20} className="text-accent fill-accent" />
                  <h3 className="font-heading text-lg uppercase tracking-wider font-bold">Client Reviews & Ratings</h3>
                </div>

                {/* Rating summary grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 items-center bg-accent/5 p-6 rounded-2xl border border-accent/10">
                  <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r dark:border-border border-border-light pb-4 md:pb-0 md:pr-6">
                    <span className="block text-5xl font-heading font-black text-accent">{p.rating}</span>
                    <div className="flex justify-center my-1.5">
                      <StarRating rating={p.rating} />
                    </div>
                    <span className="text-xs text-textSecondary dark:text-textSecondary uppercase tracking-widest font-semibold block">
                      {p.reviewCount} Client Ratings
                    </span>
                  </div>

                  {/* Fake Star Progress breakdown */}
                  <div className="md:col-span-8 space-y-2 text-xs text-textSecondary">
                    {[
                      { stars: 5, pct: '88%' },
                      { stars: 4, pct: '10%' },
                      { stars: 3, pct: '2%' },
                      { stars: 2, pct: '0%' },
                      { stars: 1, pct: '0%' },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-2">
                        <span className="w-3 text-right font-medium">{row.stars}</span>
                        <Star size={10} className="text-accent fill-accent flex-shrink-0" />
                        <div className="flex-1 h-1.5 rounded-full dark:bg-card bg-gray-200 overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: row.pct }} />
                        </div>
                        <span className="w-8 text-right font-medium">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed comments list */}
                <div className="space-y-4">
                  {profileTestimonials.map((t, i) => (
                    <div 
                      key={i} 
                      className="p-5 rounded-2xl dark:bg-surface bg-gray-50 border dark:border-border border-border-light flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, j) => (
                            <Star key={j} size={12} className="text-accent fill-accent" />
                          ))}
                        </div>
                        <p className="text-textSecondary dark:text-textSecondary text-sm leading-relaxed italic">
                          &ldquo;{t.text}&rdquo;
                        </p>
                        <span className="block text-xs font-heading uppercase tracking-wider font-bold text-textPrimary-light dark:text-textPrimary">
                          — {t.name}
                        </span>
                      </div>
                      <span className="text-textSecondary dark:text-textSecondary text-[10px] uppercase font-semibold whitespace-nowrap self-end md:self-start">
                        {t.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
          </div>
          
        </div>

      </div>
    </div>
  );
}
