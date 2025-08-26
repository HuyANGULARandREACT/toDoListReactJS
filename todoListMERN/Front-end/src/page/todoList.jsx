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
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container mx-auto h-screen border-2 border-black p-5">
      <div className="header m-5 border-2 h-[10vh] items-center flex justify-center">
        <h1 className="text-3xl font-bold">My Todo List</h1>
      </div>

      {/* ✅ Form thêm Todo */}
      <div className="flex gap-2 mb-5">
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

      {/* ✅ Danh sách Todo */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => handleToggleComplete(todo)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
