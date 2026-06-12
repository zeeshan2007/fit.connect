const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Read Excel
const workbook = XLSX.readFile(path.join(__dirname, '..', '..', 'trainers.xlsx'));
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(sheet);

// Deterministic hash for consistent avatar gradients
function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Gradient palette for avatars
const gradients = [
  ['#C6F135', '#7CB342'],
  ['#00BCD4', '#0097A7'],
  ['#FF7043', '#E64A19'],
  ['#AB47BC', '#7B1FA2'],
  ['#42A5F5', '#1565C0'],
  ['#EF5350', '#C62828'],
  ['#66BB6A', '#2E7D32'],
  ['#FFA726', '#EF6C00'],
  ['#EC407A', '#AD1457'],
  ['#5C6BC0', '#283593'],
];

// Infer category from keywords
function inferCategory(experience, offers) {
  const text = `${experience} ${offers}`.toLowerCase();
  const isTrainer = /fitness trainer|workout|lifting|sports|exercise|conditioning|rehabilitation|physiotherapist|posture/.test(text);
  const isDietician = /nutritionist|dietician|dietitian|diet|nutrition|dietetics|weight loss|weight management|metabolic/.test(text);
  
  if (isTrainer && isDietician) return 'Both';
  if (isTrainer) return 'Trainer';
  return 'Dietician';
}

// Extract city from location
function extractCity(location) {
  // Most entries are Lahore-based
  const loc = location.toLowerCase();
  if (loc.includes('peshawar')) return 'Peshawar';
  if (loc.includes('islamabad') || loc.includes('oladoc')) return 'Islamabad';
  if (loc.includes('karachi')) return 'Karachi';
  if (loc.includes('video consultation') && !loc.includes('/')) return 'Online';
  // Default to Lahore for most entries
  return 'Lahore';
}

// Extract years of experience
function extractYears(experience) {
  const match = experience.match(/(\d+)\s*years?/i);
  return match ? parseInt(match[1]) : null;
}

// Extract degree/certifications
function extractCertifications(experience) {
  // Remove years prefix if present
  let cleaned = experience.replace(/^\d+\s*years?\s*\(?/i, '').replace(/\)$/, '');
  if (cleaned === experience) cleaned = experience;
  
  return cleaned
    .split(/[,&]/)
    .map(s => s.trim().replace(/^\(/, '').replace(/\)$/, ''))
    .filter(s => s.length > 2);
}

// Check if session is online
function isOnline(location) {
  return /video|online|independent/i.test(location);
}

function isInPerson(location) {
  return /clinic|hospital|center|complex|labs/i.test(location);
}

function getSessionType(location) {
  const online = isOnline(location);
  const inPerson = isInPerson(location);
  if (online && inPerson) return 'Both';
  if (online) return 'Online';
  return 'In-Person';
}

// Generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get initials
function getInitials(name) {
  const cleaned = name.replace(/^(Dr\.|Mr\.|Ms\.|Prof\.|Dietition)\s*/i, '');
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

// Generate seeded rating between 4.0 and 5.0
function generateRating(name) {
  const h = hashStr(name);
  return Math.round((4.0 + (h % 11) / 10) * 10) / 10;
}

// Generate review count
function generateReviewCount(name) {
  const h = hashStr(name + 'reviews');
  return 15 + (h % 85);
}

// Transform raw data
const professionals = rawData.map((row, index) => {
  const name = row['Trainer Name'] || 'Unknown';
  const location = row['Location / Platform'] || '';
  const experience = row['Experience / Degree'] || '';
  const fee = row['Fee / Price (PKR)'] || 0;
  const offers = row['Offers / Specials'] || '';
  const phone = row['Contact Number'] || '';
  
  const slug = generateSlug(name);
  const h = hashStr(name);
  const gradient = gradients[h % gradients.length];
  
  const years = extractYears(experience);
  const certs = extractCertifications(experience);
  const category = inferCategory(experience, offers);
  const city = extractCity(location);
  const sessionType = getSessionType(location);
  
  // Build specializations from offers
  const specializations = offers
    .split(/[,&]/)
    .map(s => s.trim())
    .filter(s => s.length > 2);
  
  // Compose bio
  const yearText = years ? `${years} years of experience` : 'Experienced professional';
  const certText = certs.length > 0 ? ` with qualifications in ${certs.slice(0, 2).join(' and ')}` : '';
  const specText = specializations.length > 0 ? `. Specializing in ${specializations.slice(0, 2).join(', ')}` : '';
  const bio = `${yearText}${certText}${specText}. Available for ${sessionType.toLowerCase()} consultations in ${city}.`;
  
  // Extract platform name
  const platformParts = location.split('/').map(s => s.trim());
  const platform = platformParts[0] || location;
  const locationDetail = platformParts.length > 1 ? platformParts.slice(1).join(' / ') : '';

  return {
    id: slug,
    index: index + 1,
    name,
    initials: getInitials(name),
    avatarGradient: gradient,
    category,
    city,
    location: platform,
    locationDetail,
    sessionType,
    experience: years,
    experienceRaw: experience,
    degree: certs.join(', '),
    certifications: certs,
    fee: typeof fee === 'number' ? fee : parseInt(String(fee).replace(/[^0-9]/g, '')) || 0,
    feeFormatted: `Rs. ${(typeof fee === 'number' ? fee : parseInt(String(fee).replace(/[^0-9]/g, '')) || 0).toLocaleString()}`,
    specializations,
    bio,
    phone,
    rating: generateRating(name),
    reviewCount: generateReviewCount(name),
  };
});

// Write output
const outputDir = path.join(__dirname, '..', 'public', 'data');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(
  path.join(outputDir, 'professionals.json'),
  JSON.stringify(professionals, null, 2)
);

console.log(`✅ Generated ${professionals.length} professionals → public/data/professionals.json`);
professionals.forEach(p => {
  console.log(`  ${p.index}. ${p.name} | ${p.category} | ${p.city} | Rs.${p.fee} | ⭐${p.rating}`);
});
