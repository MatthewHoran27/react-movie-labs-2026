import React, { createContext, useState, useEffect } from 'react';
import { themes, createCustomTheme } from '../theme';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [availableThemes, setAvailableThemes] = useState(themes);

  const [currentThemeName, setCurrentThemeName] = useState(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const theme = availableThemes[currentThemeName]?.theme;
  const isDarkMode = currentThemeName === 'dark';

  const setTheme = (themeName) => {
    if (availableThemes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  const addCustomTheme = (themeName, themeConfig) => {
    const updatedThemes = { ...availableThemes };
    updatedThemes[themeName] = {
      name: themeConfig.name,
      theme: createCustomTheme(themeConfig),
      isCustom: true,
      config: themeConfig,
    };

    setAvailableThemes(updatedThemes);
  };

  const removeCustomTheme = (themeName) => {
    if (availableThemes[themeName]?.isCustom) {
      const updatedThemes = { ...availableThemes };
      delete updatedThemes[themeName];
      setAvailableThemes(updatedThemes);

      if (currentThemeName === themeName) {
        setCurrentThemeName('light');
      }
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentThemeName, 
        theme, 
        isDarkMode, 
        setTheme,
        availableThemes,
        addCustomTheme,
        removeCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
