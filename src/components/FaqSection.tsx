'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How do I connect with a fitness trainer or dietician?',
    answer: 'Simply browse the professionals, select one, fill in a quick form with your goal and budget, and click "Send via WhatsApp". This will instantly generate a pre-filled message and connect you directly with the professional on WhatsApp. No registrations required!',
  },
  {
    question: 'Are there any registration or platform fees?',
    answer: 'No! FitHire is a completely free-to-use directory. There are no registration fees, platform charges, or hidden commissions. You negotiate and pay the professional directly for their services.',
  },
  {
    question: 'Are the trainers and dieticians certified?',
    answer: 'Yes, all professionals listed on FitHire are certified experts. You can see their degrees, specific certifications, and years of experience detailed on their profile pages before deciding to contact them.',
  },
  {
    question: 'Can I get online coaching or only in-person sessions?',
    answer: 'Many professionals on our platform offer both online (via video calls, diet apps, and chat) and in-person sessions (at gyms, hospitals, or private clinics). You can filter professionals by "Online" or "In-Person" on the browse page to find the match that fits your lifestyle.',
  },
  {
    question: 'Which cities in Pakistan are covered?',
    answer: 'While we specialize in linking you with top-tier trainers and dieticians in major cities like Rawalpindi, Islamabad, Lahore, Karachi, and Peshawar, our online consultation model allows you to connect with any professional regardless of your location in Pakistan or abroad.',
  },
];

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section dark:bg-surface bg-surface-light border-t dark:border-border border-border-light">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-12" trigger="mount">
          <span className="badge-accent text-xs mb-4 inline-block">FAQs</span>
          <h2 className="section-heading">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="dark:text-textSecondary text-textSecondary-light max-w-md mx-auto text-sm">
            Got questions about how FitHire works? We have answers.
          </p>
        </AnimatedSection>

        {/* FAQ Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <AnimatedSection key={index} delay={index * 0.08} trigger="mount">
                <div 
                  className={`card transition-all duration-300 overflow-hidden border ${
                    isExpanded 
                      ? 'border-accent bg-accent/5 dark:shadow-accent-glow' 
                      : 'dark:border-border border-border-light hover:border-accent/40'
                  }`}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start gap-3.5 pr-4">
                      <HelpCircle 
                        size={20} 
                        className={`mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                          isExpanded ? 'text-accent' : 'dark:text-textSecondary text-textSecondary-light'
                        }`} 
                      />
                      <span className="font-heading text-sm md:text-base font-bold uppercase tracking-wide text-textPrimary-light dark:text-textPrimary">
                        {faq.question}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className={`flex-shrink-0 transition-colors duration-300 ${
                        isExpanded ? 'text-accent' : 'dark:text-textSecondary text-textSecondary-light'
                      }`}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  {/* Expanded Content wrapper */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 md:px-6 pb-6 pt-1 md:pb-8 pl-12 dark:text-textSecondary text-textSecondary-light text-xs md:text-sm leading-relaxed border-t border-accent/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
