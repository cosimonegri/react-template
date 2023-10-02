import { useThemeContext } from "contexts/theme";
import "./test.scss";

const BLOCK = "test";

export const Test = () => {
    const { switchTheme } = useThemeContext();

    return (
        <div className={BLOCK}>
            <p>React App</p>
            <button onClick={switchTheme}>Switch Theme</button>
        </div>
    );
};
