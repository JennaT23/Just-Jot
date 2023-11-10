// import React, { useState } from 'react';
// import { colors } from './colors';

// export const ThemeContext = React.createContext();

// const ThemeProvider = ({children}) => {
//   // const isLightTheme = true; // this is temporary, we will get back to it later
//   const [isLightTheme, setLightTheme] = useState(true);
//   const toggleTheme = () => setLightTheme(previousState => !previousState);

//   const theme = {
//     colors: isLightTheme ? colors.light : colors.dark,
//     toggleTheme,
//     isLightTheme,
//   };

//   return (
//     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;

// import React, { useState } from 'react';
// import { colors } from './colors';

// export const ThemeContext = React.createContext();

// const ThemeProvider = ({ children }) => {

//   const [isDarkTheme, setDarkTheme] = useState(false); // default to light theme
//   const toggleTheme = () => setDarkTheme(previousState => !previousState);

// const theme = {
//   colors: isDarkTheme ? colors.dark : colors.light,
//   toggleTheme,
//   isDarkTheme,
// };

//   return (
//     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;

import React, { useState, createContext } from 'react';
import { themes } from './themeColors';

export const ThemeContext = createContext(colorTheme);

export const DarkModeContext = createContext(isDarkTheme);

const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(themes.purple.light);
  // const [colorTheme, setColorTheme] = useState('purple'); // setting purple as default color
  const [isDarkTheme, setDarkTheme] = useState(false);
  // const toggleLightDark = () => { setDarkTheme(previousState => !previousState) };

  const changeThemeColor = (color) => {
    setColorTheme(themes[color].light);
  };

  // const theme = themes[colorTheme][isDarkTheme ? 'dark' : 'light'];

  // const theme = {
  //   colorTheme : isDarkTheme ? themes.colorTheme.dark : themes.colorTheme.light,
  //   setColorTheme,

  // }

  const toggleLightDark = () => {
    setDarkTheme(isDarkTheme === themes[color].light ? themes[color].dark : themes[color].light);
  };

  // UseEffect to switch between light and dark themes when the mode changes
  React.useEffect(() => {
    setColorTheme(isDarkTheme ? themes.purple.dark : themes.purple.light);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={colorTheme}>
      <DarkModeContext.Provider value={isDarkTheme}>
        {children}
      </DarkModeContext.Provider>
    </ThemeContext.Provider>


  );
};

export default ThemeProvider;