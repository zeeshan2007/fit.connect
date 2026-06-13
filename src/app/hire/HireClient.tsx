'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { HireFormData } from '@/types';
import { getAllProfessionals } from '@/lib/professionals';
import { StarRating } from '@/components/ProfessionalCard';

const goals = ['Weight Loss', 'Muscle Gain', 'Diet Plan', 'Rehabilitation', 'Custom'];
const budgets = ['Under 5k', '5k–10k', '10k–20k', '20k+'];
const times = ['Morning', 'Afternoon', 'Evening'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 font-body">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-heading text-sm font-bold transition-all duration-300 ${
              i < current
                ? 'bg-accent text-surface'
                : i === current
                ? 'bg-accent text-surface shadow-accent-glow'
                : 'dark:bg-card bg-gray-200 dark:text-textSecondary text-textSecondary-light border dark:border-border border-border-light'
            }`}
          >
            {i < current ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div
              className={`w-12 md:w-20 h-0.5 transition-all duration-300 ${
                i < current ? 'bg-accent' : 'dark:bg-border bg-border-light'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function HireClient() {
  return (
    <Suspense fallback={<div className="pt-20 md:pt-24 pb-16 md:pb-24 dark:bg-surface bg-surface-light" />}>
      <HireContent />
    </Suspense>
  );
}

function HireContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const professionalName = searchParams.get('professional') || '';

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<HireFormData>({
    fullName: '',
    whatsapp: '',
    city: '',
    goal: '',
    sessionType: '',
    budget: '',
    preferredDays: [],
    preferredTime: '',
    healthNotes: '',
    interestedIn: professionalName,
  });

  useEffect(() => {
    if (professionalName) {
      setForm(prev => ({ ...prev, interestedIn: professionalName }));
    }
  }, [professionalName]);

  const allProfessionals = getAllProfessionals();
  const topRated = useMemo(() => {
    return allProfessionals
      .filter(p => p.id === 'ms-aroosa-touseef' || p.id === 'ibrahim-ghafoor-khan' || p.id === 'ms-faiza-hanif')
      .sort((a, b) => b.reviewCount - a.reviewCount);
  }, [allProfessionals]);

  const updateField = (field: keyof HireFormData, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setForm(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day],
    }));
  };

  const canNext = () => {
    switch (step) {
      case 0: return form.fullName && form.whatsapp && form.city;
      case 1: return form.goal && form.sessionType && form.budget;
      case 2: return form.preferredDays.length > 0 && form.preferredTime;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSelect = (name: string) => {
    setForm(prev => ({ ...prev, interestedIn: name }));
    const el = document.getElementById('hire-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const message = `🏋️ New Hiring Request\n\n👤 Client: ${form.fullName}\n📱 WhatsApp: ${form.whatsapp}\n📍 City: ${form.city}\n🎯 Goal: ${form.goal}\n💻 Session Type: ${form.sessionType}\n💰 Budget: ${form.budget}\n📅 Preferred Days: ${form.preferredDays.join(', ')}\n⏰ Preferred Time: ${form.preferredTime}\n🏥 Health Notes: ${form.healthNotes || 'None'}\n👨‍💼 Interested In: ${form.interestedIn || 'General Inquiry'}`;

    const url = `https://wa.me/923323145866?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    router.push('/thank-you');
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 dark:bg-surface bg-surface-light">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 font-body">
        <AnimatedSection className="text-center mb-12" trigger="mount">
          <h1 className="font-heading text-3xl md:text-display-sm font-bold uppercase tracking-wider mb-2 text-text dark:text-text">
            Hire a <span className="text-accent">Professional</span>
          </h1>
          <p className="dark:text-textSecondary text-textSecondary-light text-sm">
            Fill in your details and we&apos;ll connect you via WhatsApp instantly.
          </p>
          {form.interestedIn && (
            <div className="mt-3 badge-accent inline-flex">
              Hiring: {form.interestedIn}
            </div>
          )}
        </AnimatedSection>

        {/* Top Rated Professionals Section */}
        <AnimatedSection className="mb-16" trigger="mount">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2 text-text dark:text-text">
              ⭐ Top Rated Professionals — Most Reviews
            </h2>
            <p className="dark:text-textSecondary text-textSecondary-light text-sm">
              Based on client reviews — our most trusted professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRated.map((p) => (
              <div key={p.id} className="card p-5 md:p-6 flex flex-col justify-between group relative border dark:border-border border-border-light">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="avatar-gradient w-12 h-12 flex items-center justify-center rounded-full text-md font-bold text-white flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${p.avatarGradient[0]}, ${p.avatarGradient[1]})`,
                      }}
                    >
                      {p.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-bold uppercase tracking-wide truncate group-hover:text-accent transition-colors duration-300">
                        {p.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="badge-accent text-[8px] md:text-[9px] px-1.5 py-0.5">{p.category}</span>
                        <span className="badge-accent text-[8px] md:text-[9px] px-1.5 py-0.5">{p.sessionType}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <StarRating rating={p.rating} reviewCount={p.reviewCount} />
                  </div>
                  <p className="dark:text-textSecondary text-textSecondary-light text-xs line-clamp-3 mb-4 h-12">
                    {p.bio}
                  </p>
                </div>
                <button
                  onClick={() => handleSelect(p.name)}
                  className={`w-full py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    form.interestedIn === p.name
                      ? 'bg-accent text-surface border-accent shadow-accent-glow'
                      : 'dark:border-border border-border-light hover:border-accent dark:hover:text-accent hover:text-accent text-text dark:text-text bg-transparent'
                  }`}
                >
                  {form.interestedIn === p.name ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div id="hire-form-container" className="max-w-2xl mx-auto card p-6 md:p-10">
          <StepIndicator current={step} total={3} />

          <div className="relative overflow-hidden min-h-[340px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={prefersReducedMotion ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Step 1: Personal Info */}
                {step === 0 && (
                  <div className="space-y-5">
                    <h2 className="font-heading text-lg uppercase tracking-wider font-bold mb-4 text-text dark:text-text">Personal Info</h2>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Your full name"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-2">WhatsApp Number *</label>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => updateField('whatsapp', e.target.value)}
                        placeholder="+92 3XX XXXXXXX"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-2">City *</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder="e.g. Lahore, Karachi, Islamabad"
                        className="input"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Goals */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h2 className="font-heading text-lg uppercase tracking-wider font-bold mb-4 text-text dark:text-text">Your Goals</h2>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-2">Goal *</label>
                      <select
                        value={form.goal}
                        onChange={(e) => updateField('goal', e.target.value)}
                        className="input cursor-pointer text-sm"
                      >
                        <option value="">Select your goal</option>
                        {goals.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-3">Session Type *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Online', 'In-Person'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => updateField('sessionType', type)}
                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              form.sessionType === type
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'dark:border-border border-border-light dark:hover:border-accent/50 hover:border-accent/50 text-text dark:text-text'
                            }`}
                          >
                            {type === 'Online' ? '💻' : '🏢'} {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-3">Budget (PKR) *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {budgets.map(b => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => updateField('budget', b)}
                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              form.budget === b
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'dark:border-border border-border-light dark:hover:border-accent/50 hover:border-accent/50 text-text dark:text-text'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-heading text-lg uppercase tracking-wider font-bold mb-4 text-text dark:text-text">Schedule</h2>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-3">Preferred Days *</label>
                      <div className="flex flex-wrap gap-2">
                        {days.map(day => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`w-12 h-12 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              form.preferredDays.includes(day)
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'dark:border-border border-border-light dark:hover:border-accent/50 hover:border-accent/50 text-text dark:text-text'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-3">Preferred Time *</label>
                      <div className="grid grid-cols-3 gap-3">
                        {times.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => updateField('preferredTime', t)}
                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              form.preferredTime === t
                                ? 'border-accent bg-accent/10 text-accent'
                                : 'dark:border-border border-border-light dark:hover:border-accent/50 hover:border-accent/50 text-text dark:text-text'
                            }`}
                          >
                            {t === 'Morning' ? '🌅' : t === 'Afternoon' ? '☀️' : '🌙'} {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider dark:text-textSecondary text-textSecondary-light mb-2">Health Notes (Optional)</label>
                      <textarea
                        value={form.healthNotes}
                        onChange={(e) => updateField('healthNotes', e.target.value)}
                        placeholder="Any health conditions, injuries, allergies, or special requirements..."
                        rows={3}
                        className="input resize-none text-sm"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t dark:border-border border-border-light">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className={`btn-secondary ${step === 0 ? 'opacity-30 pointer-events-none' : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            {step < 2 ? (
              <button
                onClick={handleNext}
                disabled={!canNext()}
                className={`btn-primary ${!canNext() ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Next
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext()}
                className={`btn-primary ${!canNext() ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send via WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
