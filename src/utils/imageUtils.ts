/**
 * Utility functions for image handling
 */

/**
 * Checks if an image URL is potentially invalid or inaccessible
 * This includes local file URLs, invalid formats, or other problematic URLs
 */
export const isInvalidImageUrl = (url?: string): boolean => {
  if (!url) return true;

  // Local file URLs that can't be loaded in browser
  if (url.startsWith('file:///')) return true;

  // Data URLs that are too large or malformed
  if (url.startsWith('data:') && url.length > 50000) return true;

  // Local device paths that won't work in browser
  if (url.match(/^([A-Z]:)?[\\/]/) || url.includes('\\')) return true;

  // Relative paths without http(s)
  if (!url.startsWith('http') && !url.startsWith('data:')) return true;

  return false;
};

/**
 * Gets a fallback image URL from DiceBear based on a name
 */
export const getAvatarPlaceholder = (name = 'User'): string => {
  return `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(name)}`;
};

/**
 * Generates initials from a name for avatar display
 */
export const getInitials = (name?: string): string => {
  const defaultName = name?.trim() || 'Unnamed Patient';

  if (defaultName === 'Unnamed Patient') return '?';

  return defaultName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
