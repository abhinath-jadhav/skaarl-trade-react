import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../store/themeSlice";

function ThemeToggle() {
  // Set the initial theme based on localStorage
  const [isDarkMode, setIsDarkMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Apply the theme class to the root HTML element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      dispatch(changeTheme(true));
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(changeTheme(false));
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-1 text-3xl rounded-md transition-colors duration-300 border border-slate-500"
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
