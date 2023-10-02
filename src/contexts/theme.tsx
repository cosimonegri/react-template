import React from "react";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const DEFAULT_THEME = LIGHT_THEME;
const THEME_STORAGE_KEY = "data-theme";

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

const isTheme = (value: unknown): value is Theme => {
    return value === LIGHT_THEME || value === DARK_THEME;
};

const getOppositeTheme = (theme: Theme) => {
    return theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
};

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ThemeContext = React.createContext<ThemeContextProps>({
    theme: DEFAULT_THEME,
    setTheme: () => {},
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
    const initialStoredTheme = React.useMemo(() => {
        return localStorage.getItem(THEME_STORAGE_KEY);
    }, []);
    const [theme, setTheme] = React.useState<Theme>(
        isTheme(initialStoredTheme) ? initialStoredTheme : DEFAULT_THEME,
    );
    const [isThemeInStorage, setIsThemeInStorage] = React.useState(
        isTheme(initialStoredTheme),
    );
    const systemPreferenceRef = React.useRef(
        window.matchMedia(
            `(prefers-color-scheme: ${getOppositeTheme(DEFAULT_THEME)})`,
        ),
    );

    const updateTheme = (theme: Theme) => {
        setTheme(theme);
        setIsThemeInStorage(true);
        document.documentElement.setAttribute(THEME_STORAGE_KEY, theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    };

    const updateThemeFromSystemPreference = () => {
        if (!isThemeInStorage) {
            const theme = systemPreferenceRef.current.matches
                ? getOppositeTheme(DEFAULT_THEME)
                : DEFAULT_THEME;
            setTheme(theme);
            document.documentElement.setAttribute(THEME_STORAGE_KEY, theme);
        }
    };

    React.useLayoutEffect(() => {
        document.documentElement.setAttribute(THEME_STORAGE_KEY, theme);
        updateThemeFromSystemPreference();
    }, []);

    React.useEffect(() => {
        systemPreferenceRef.current.addEventListener(
            "change",
            updateThemeFromSystemPreference,
        );
        return () => {
            systemPreferenceRef.current.removeEventListener(
                "change",
                updateThemeFromSystemPreference,
            );
        };
    }, [isThemeInStorage]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: (theme: Theme) => updateTheme(theme),
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
