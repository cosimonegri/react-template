import { Test } from "components/Test";
import { ThemeContextProvider } from "contexts/theme";

import "styles/base.scss";
import "styles/colors.scss";

export const App = () => {
    return (
        <ThemeContextProvider>
            <Test />
        </ThemeContextProvider>
    );
};
