const baseTheme = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px',
  },
  transitions: {
    default: '0.2s ease-in-out',
  },
  fonts: {
    primary:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
};

const lightColors = {
  primary: '#9333EA', // Main purple
  secondary: '#A855F7', // Lighter purple
  tertiary: '#7C3AED', // Alternative purple
  success: '#34C759', // iOS green
  error: '#FF3B30', // iOS red
  warning: '#FF9500', // iOS orange
  background: '#F9F7FD', // Light lavender tinted background
  surface: '#FFFFFF',
  border: '#E5E5EA', // iOS light border
  text: {
    primary: '#1E1B24', // Dark purple-black
    secondary: '#4E4B66', // Medium purple-gray
    light: '#8E8E93',
  },
};

const darkColors = {
  primary: '#A855F7', // Lighter purple for dark mode
  secondary: '#C084FC', // Even lighter purple
  tertiary: '#8B5CF6', // Alternative purple for dark mode
  success: '#30D158', // iOS dark mode green
  error: '#FF453A', // iOS dark mode red
  warning: '#FF9F0A', // iOS dark mode orange
  background: '#1A1625', // Dark purple background
  surface: '#2A2438', // Dark purple surface
  border: '#38383A', // iOS dark mode border
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
    light: '#8E8E93',
  },
};

const lightShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  lg: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const darkShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
  md: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  lg: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
};

export const light = {
  ...baseTheme,
  colors: lightColors,
  shadows: lightShadows,
  isDark: false,
};

export const dark = {
  ...baseTheme,
  colors: darkColors,
  shadows: darkShadows,
  isDark: true,
};

export type ThemeType = typeof light;

const theme = light;
export default theme;
