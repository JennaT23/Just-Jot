import {useContext} from 'react';
import {ThemeContext} from './themeProvider';

const useTheme = () => {
 return useContext(ThemeContext);
};

export default useTheme;