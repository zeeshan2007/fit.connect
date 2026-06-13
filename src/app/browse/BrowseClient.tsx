'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimatedProfessionalCard from '@/components/ProfessionalCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import AnimatedSection from '@/components/AnimatedSection';
import { getFilteredProfessionals, getUniqueCities } from '@/lib/professionals';
import { Filters } from '@/types';

export default function BrowseClient() {
  return (
    <Suspense fallback={<div className="pt-20 md:pt-24 pb-16 md:pb-24 dark:bg-surface bg-surface-light" />}>
      <BrowseContent />
    </Suspense>
  );
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState<Filters>({
    search: initialSearch,
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    sessionType: 'all',
    city: 'all',
    sortBy: 'rating',
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const cities = useMemo(() => getUniqueCities(), []);
  const results = useMemo(() => getFilteredProfessionals(filters), [filters]);

  // Sync search param
  useEffect(() => {
    if (initialSearch) {
      setFilters(prev => ({ ...prev, search: initialSearch }));
    }
  }, [initialSearch]);

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 dark:bg-surface bg-surface-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 font-body">
        {/* Header */}
        <AnimatedSection className="mb-8" trigger="mount">
          <h1 className="font-heading text-3xl md:text-display-sm font-bold uppercase tracking-wider mb-2 text-text dark:text-text">
            Browse <span className="text-accent">Professionals</span>
          </h1>
          <p className="dark:text-textSecondary text-textSecondary-light">
            Find the perfect fitness trainer or dietician for your goals in Pakistan.
          </p>
        </AnimatedSection>

        {/* Search + Mobile Filter Toggle */}
        <div className="flex gap-3 mb-8">
          <SearchBar
            value={filters.search}
            onChange={(search) => setFilters(prev => ({ ...prev, search }))}
            className="flex-1"
          />
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden btn-secondary px-4"
            aria-label="Open filters"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            cities={cities}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            resultCount={results.length}
          />

          {/* Results Grid */}
          <div className="flex-1">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((p, i) => (
                  <AnimatedProfessionalCard key={p.id} professional={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading text-xl uppercase tracking-wider mb-2">No Results Found</h3>
                <p className="dark:text-textSecondary text-textSecondary-light text-sm">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => setFilters({
                    search: '',
                    category: 'all',
                    priceRange: 'all',
                    rating: 'all',
                    sessionType: 'all',
                    city: 'all',
                    sortBy: 'rating',
                  })}
                  className="btn-primary mt-6"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
