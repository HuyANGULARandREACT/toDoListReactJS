import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo Theme Context
const ThemeContext = createContext();

// Custom hook để sử dụng Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load theme từ localStorage khi component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("todo-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme vào localStorage khi theme thay đổi
  useEffect(() => {
    localStorage.setItem("todo-theme", theme);
    // Thêm class vào body để apply global theme
    document.body.className = theme;
  }, [theme]);

  // Function để toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    isLight: theme === "light",
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
