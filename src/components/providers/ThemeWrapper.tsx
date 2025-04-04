import { useState, createContext, useContext, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '../../styles/theme';
import { GlobalStyles } from '../../styles/GlobalStyles';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  theme: typeof light | typeof dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? dark : light;

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({ isDarkTheme, toggleTheme, theme }),
    [isDarkTheme, theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeWrapper');
  }

  return context;
};
