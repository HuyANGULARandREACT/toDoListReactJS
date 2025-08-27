import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import {
  getTodoList,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../APIS/api";
import "./TodoList.css";

const TodoList = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = React.useState("all");
  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTodoList();
      setTodos(data);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setAddingTodo(true);
      setError("");
      const todoData = {
        text: newTodo.trim(),
      };
      const createdTodo = await createTodo(todoData);
      setTodos([...todos, createdTodo]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to create todo");
      console.error(err);
    } finally {
      setAddingTodo(false);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      setError("");
      const updatedTodo = await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === todo._id ? updatedTodo : t)));
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setError("");
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  const handleEditStart = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const handleEditSave = async (id) => {
    if (!editText.trim()) return;

    try {
      setError("");
      const todo = todos.find((t) => t._id === id);
      const updatedTodo = await updateTodo(id, {
        ...todo,
        text: editText.trim(),
      });
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
      setEditingId(null);
      setEditText("");
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };
  const filteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "incomplete") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className={`todo-container ${theme} `}>
      <div className="todo-header">
        <div className="header-top">
          <h1>Todo List</h1>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
        <form onSubmit={handleCreateTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="todo-input"
            disabled={addingTodo}
          />
          <button
            type="submit"
            className={`add-btn ${addingTodo ? "loading" : ""}`}
            disabled={addingTodo || !newTodo.trim()}
          >
            {addingTodo ? "Adding..." : "Add"}
          </button>
        </form>
        <div className="flex justify-between">
          <div className="todo-stats">
            <span>
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="todo-stats "
          >
            <option value="all">All Jobs</option>
            <option value="completed">Completed Jobs</option>
            <option value="incomplete">Incomplete Jobs</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="todo-list">
        {loading && filteredTodos().length === 0 ? (
          <div className="loading">Loading todos...</div>
        ) : filteredTodos().length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          filteredTodos().map((todo) => (
            <div
              key={todo._id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  className="todo-checkbox"
                />

                {editingId === todo._id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEditSave(todo._id);
                      } else if (e.key === "Escape") {
                        handleEditCancel();
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className={`todo-text ${
                      todo.completed ? "completed-text" : ""
                    }`}
                    onDoubleClick={() => handleEditStart(todo)}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <div className="todo-actions">
                {editingId === todo._id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(todo._id)}
                      className="save-btn"
                      disabled={!editText.trim()}
                    >
                      Save
                    </button>
                    <button onClick={handleEditCancel} className="cancel-btn">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(todo)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>

              {todo.createdAt && (
                <div className="todo-date">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="todo-footer">
          <button
            onClick={fetchTodos}
            className="refresh-btn"
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
