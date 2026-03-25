import React, { createContext, useState, useEffect } from 'react';
import { themes } from '../theme';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState(() => {
    // Try to get saved preference from localStorage
    const saved = localStorage.getItem('theme-name');
    if (saved && themes[saved]) {
      return saved;
    }
    // Otherwise check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('theme-name', currentThemeName);
  }, [currentThemeName]);

  const theme = themes[currentThemeName].theme;
  const isDarkMode = currentThemeName === 'dark';

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentThemeName, 
        theme, 
        isDarkMode, 
        setTheme,
        availableThemes: themes
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
