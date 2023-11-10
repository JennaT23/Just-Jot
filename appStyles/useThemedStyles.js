import useTheme from './useTheme';

const useThemedStyles = (styles) => {
    const { colorTheme } = useTheme();
    return styles(colorTheme);
};

export default useThemedStyles;