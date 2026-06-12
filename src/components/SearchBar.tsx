'use client';

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search by name, specialty, or city...',
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-textSecondary text-textSecondary-light"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-12 pr-4"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 dark:text-textSecondary text-textSecondary-light hover:text-accent transition-colors"
          aria-label="Clear search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
