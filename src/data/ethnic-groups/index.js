const modules = import.meta.glob(['./*.js', '!./index.js'], { eager: true, import: 'default' });

const profiles = Object.values(modules).filter((profile) => profile && profile.slug);

export const ETHNIC_GROUPS = Object.fromEntries(
  profiles.map((profile) => [profile.slug, profile]),
);

const normalizeName = (value = '') => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('vi')
  .replace(/[’']/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const slugByName = new Map(profiles.map((profile) => [normalizeName(profile.name), profile.slug]));

const nameAliases = {
  raglay: 'ra-glai',
  'khmer nam bo': 'khmer',
  'cham nam bo': 'cham',
  'pa co': 'ta-oi',
};

export function findEthnicGroupSlug(label = '') {
  const name = label.replace(/\s*\([^)]*\)/g, '').trim();
  const normalized = normalizeName(name);
  return nameAliases[normalized] ?? slugByName.get(normalized) ?? null;
}
