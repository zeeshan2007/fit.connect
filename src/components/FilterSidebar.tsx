'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filters } from '@/types';

interface FilterSidebarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  cities: string[];
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block font-heading text-xs uppercase tracking-widest text-accent mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input text-sm cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterContent({
  filters,
  onChange,
  cities,
  resultCount,
  onReset,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  cities: string[];
  resultCount: number;
  onReset: () => void;
}) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.priceRange !== 'all' || 
    filters.rating !== 'all' || 
    filters.sessionType !== 'all' || 
    filters.city !== 'all';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg uppercase tracking-wider font-bold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs text-accent hover:underline font-medium"
          >
            Reset All
          </button>
        )}
      </div>

      <p className="text-xs dark:text-textSecondary text-textSecondary-light">
        Showing <span className="text-accent font-bold">{resultCount}</span> professionals
      </p>

      <FilterSelect
        label="Category"
        value={filters.category}
        onChange={(v) => updateFilter('category', v)}
        options={[
          { value: 'all', label: 'All Categories' },
          { value: 'Trainer', label: 'Fitness Trainers' },
          { value: 'Dietician', label: 'Dieticians' },
          { value: 'Both', label: 'Trainer + Dietician' },
        ]}
      />



      <FilterSelect
        label="Min Rating"
        value={filters.rating}
        onChange={(v) => updateFilter('rating', v)}
        options={[
          { value: 'all', label: 'Any Rating' },
          { value: '4.5', label: '4.5+ Stars' },
          { value: '4.0', label: '4.0+ Stars' },
        ]}
      />

      <FilterSelect
        label="Session Type"
        value={filters.sessionType}
        onChange={(v) => updateFilter('sessionType', v)}
        options={[
          { value: 'all', label: 'All Types' },
          { value: 'Online', label: 'Online' },
          { value: 'In-Person', label: 'In-Person' },
        ]}
      />

      <FilterSelect
        label="City"
        value={filters.city}
        onChange={(v) => updateFilter('city', v)}
        options={[
          { value: 'all', label: 'All Cities' },
          ...cities.map(c => ({ value: c, label: c })),
        ]}
      />

      <FilterSelect
        label="Sort By"
        value={filters.sortBy}
        onChange={(v) => updateFilter('sortBy', v)}
        options={[
          { value: 'rating', label: 'Top Rated' },
          { value: 'experience', label: 'Most Experienced' },
        ]}
      />
    </div>
  );
}

export default function FilterSidebar({
  filters,
  onChange,
  cities,
  isOpen,
  onClose,
  resultCount,
}: FilterSidebarProps) {
  const handleReset = () => {
    onChange({
      search: filters.search,
      category: 'all',
      priceRange: 'all',
      rating: 'all',
      sessionType: 'all',
      city: 'all',
      sortBy: 'rating',
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 card p-6">
          <FilterContent
            filters={filters}
            onChange={onChange}
            cities={cities}
            resultCount={resultCount}
            onReset={handleReset}
          />
        </div>
      </aside>

      {/* Mobile/Tablet Bottom Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 dark:bg-card bg-card-light rounded-t-3xl max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Drawer Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full dark:bg-border bg-border-light" />
              </div>
              <div className="px-6 pb-8 pt-2">
                <FilterContent
                  filters={filters}
                  onChange={onChange}
                  cities={cities}
                  resultCount={resultCount}
                  onReset={handleReset}
                />
                <button
                  onClick={onClose}
                  className="btn-primary w-full mt-6"
                >
                  Show {resultCount} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
