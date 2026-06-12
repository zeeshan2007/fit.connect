export interface Professional {
  id: string;
  index: number;
  name: string;
  initials: string;
  avatarGradient: [string, string];
  category: 'Trainer' | 'Dietician' | 'Both';
  city: string;
  location: string;
  locationDetail: string;
  sessionType: 'Online' | 'In-Person' | 'Both';
  experience: number | null;
  experienceRaw: string;
  degree: string;
  certifications: string[];
  fee: number;
  feeFormatted: string;
  specializations: string[];
  bio: string;
  phone: string;
  rating: number;
  reviewCount: number;
}

export interface Filters {
  search: string;
  category: string;
  priceRange: string;
  rating: string;
  sessionType: string;
  city: string;
  sortBy: string;
}

export interface HireFormData {
  fullName: string;
  whatsapp: string;
  city: string;
  goal: string;
  sessionType: string;
  budget: string;
  preferredDays: string[];
  preferredTime: string;
  healthNotes: string;
  interestedIn: string;
}
