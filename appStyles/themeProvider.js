import React, { useState } from 'react';
import { colors } from './colors';

export const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  // const isLightTheme = true; // this is temporary, we will get back to it later
  const [isLightTheme, setLightTheme] = useState(true);
  const toggleTheme = () => setLightTheme(previousState => !previousState);

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
    toggleTheme,
    isLightTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;