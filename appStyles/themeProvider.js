import React, { createContext, useState } from 'react';
import { colors } from './themeColors';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [themeColor, setThemeColor] = useState('purple');

  const changeThemeColor = (color) => {
    setThemeColor(color);
  };

const toggleLightDark = () => { setDarkTheme((prevDarkTheme) => !prevDarkTheme) };

  const theme = {
    colors: isDarkTheme ? colors[themeColor].dark : colors[themeColor].light,
    isDarkTheme,
    themeColor,
    toggleLightDark,
    changeThemeColor,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;