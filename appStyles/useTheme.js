import { useContext } from 'react';
import { ThemeContext } from './themeProvider';

const useTheme = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    const { colorTheme, toggleLightDark, changeThemeColor } = themeContext;

    return { colorTheme, toggleLightDark, changeThemeColor };
};

export default useTheme;