import React, { useEffect } from "react";
import {
  createTodo,
  deleteTodo,
  getTodoList,
  updateTodo,
} from "../../../Front-end/src/APIS/api";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [newTodo, setNewTodo] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  useEffect(() => {
    fetchTodo();
  }, []);
  const fetchTodo = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getTodoList();
      setTodos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  //hàm thêm việc cần làm
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const addedTodo = await createTodo({ text: newTodo, completed: false });
      setTodos([...todos, addedTodo]);
      setNewTodo("");
    } catch (err) {
      setError(err);
    }
  };
  //hàm toggle hoàn thành
  const handleToggleComplete = async (todo) => {
    try {
      const updated = await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === todo._id ? updated : t)));
      console.log(updated);
    } catch (err) {
      setError(err);
    }
  };
  const handleDeleteTodo = async (todo) => {
    try {
      await deleteTodo(todo._id);
      setTodos(todos.filter((t) => t._id !== todo._id));
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  const countCompletedTodos = () => {
    return todos.filter((todo) => todo.completed).length;
  };

  const countTodos = () => {
    return todos.length;
  };
  const filteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "incomplete") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} </div>;
  return (
    <div className="container mx-auto h-screen border-2 border-black p-5">
      <div className="header m-5 border-2 h-[10vh] items-center flex justify-center">
        <h1 className="text-3xl font-bold">My Todo List</h1>
      </div>

      {/* ✅ Form thêm Todo */}
      <div className="flex gap-2 m-5">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc..."
          className="border px-3 py-2 w-full"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex justify-between items-center m-5">
        <p>
          Đã hoàn thành: {todos.filter((todo) => todo.completed).length}/
          {todos.length} công việc
        </p>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2"
        >
          <option value="all">Tất cả</option>
          <option value="completed">Hoàn thành</option>
          <option value="incomplete">Chưa hoàn thành</option>
        </select>
      </div>
      {/* ✅ Danh sách Todo */}
      <div className="m-5 border-2 p-5 h-[60vh] overflow-y-auto">
        <ul>
          {filteredTodos().map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center border-b py-2"
            >
              <input
                type="checkbox"
                className="size-7 "
                onClick={() => handleToggleComplete(todo)}
              />
              <span
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
