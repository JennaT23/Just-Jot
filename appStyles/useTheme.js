import {useContext} from 'react';
import {ThemeContext, changeThemeColor, toggleLightDark} from './themeProvider';

const useTheme = () => {
 return useContext(ThemeContext);
};

export default useTheme;