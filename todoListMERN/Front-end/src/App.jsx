import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import TodoList from "./components/todo/TodoList";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <TodoList />
      </div>
    </ThemeProvider>
  );
};

export default App;
