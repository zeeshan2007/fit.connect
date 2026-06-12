import { Professional, Filters } from '@/types';
import professionalsData from '../../public/data/professionals.json';

const professionals: Professional[] = professionalsData as Professional[];

export function getAllProfessionals(): Professional[] {
  return professionals;
}

export function getProfessionalById(id: string): Professional | undefined {
  return professionals.find(p => p.id === id);
}

export function getProfessionalsByIds(ids: string[]): Professional[] {
  return professionals.filter(p => ids.includes(p.id));
}

export function getFeaturedProfessionals(count: number = 6): Professional[] {
  return [...professionals]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

export function getUniqueCities(): string[] {
  return Array.from(new Set(professionals.map(p => p.city))).sort();
}

export function getFilteredProfessionals(filters: Partial<Filters>): Professional[] {
  let result = [...professionals];

  // Search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.specializations.some(s => s.toLowerCase().includes(q)) ||
      p.city.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.bio.toLowerCase().includes(q)
    );
  }

  // Category
  if (filters.category && filters.category !== 'all') {
    result = result.filter(p => {
      if (filters.category === 'Both') return true;
      return p.category === filters.category || p.category === 'Both';
    });
  }

  // Price range
  if (filters.priceRange && filters.priceRange !== 'all') {
    result = result.filter(p => {
      switch (filters.priceRange) {
        case 'under-1000': return p.fee < 1000;
        case '1000-2000': return p.fee >= 1000 && p.fee <= 2000;
        case '2000-3000': return p.fee >= 2000 && p.fee <= 3000;
        case '3000-plus': return p.fee >= 3000;
        default: return true;
      }
    });
  }

  // Rating
  if (filters.rating && filters.rating !== 'all') {
    const minRating = parseFloat(filters.rating);
    result = result.filter(p => p.rating >= minRating);
  }

  // Session type
  if (filters.sessionType && filters.sessionType !== 'all') {
    result = result.filter(p => {
      if (p.sessionType === 'Both') return true;
      return p.sessionType === filters.sessionType;
    });
  }

  // City
  if (filters.city && filters.city !== 'all') {
    result = result.filter(p => p.city === filters.city);
  }

  // Sort
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.fee - b.fee);
        break;
      case 'price-high':
        result.sort((a, b) => b.fee - a.fee);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'experience':
        result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      default:
        break;
    }
  }

  return result;
}
