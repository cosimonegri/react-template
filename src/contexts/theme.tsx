import React from "react";
import { useMedia, useLocalStorage } from "react-use";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const THEME_KEY = "data-theme";

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ThemeContext = React.createContext<ThemeContextProps>({
    theme: LIGHT_THEME,
    setTheme: () => {},
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY);
    const isSystemDark = useMedia(`(prefers-color-scheme: ${DARK_THEME})`);

    const finalTheme = React.useMemo(
        () => (theme ? theme : isSystemDark ? DARK_THEME : LIGHT_THEME),
        [theme, isSystemDark],
    );

    React.useLayoutEffect(() => {
        document.documentElement.setAttribute(THEME_KEY, finalTheme);
    }, [finalTheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme: finalTheme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    const switchTheme = () => {
        switch (theme) {
            case LIGHT_THEME:
                setTheme(DARK_THEME);
                break;
            case DARK_THEME:
                setTheme(LIGHT_THEME);
                break;
        }
    };

    return {
        theme,
        isLight: theme === LIGHT_THEME,
        isDark: theme === DARK_THEME,
        setTheme,
        switchTheme,
    };
};
