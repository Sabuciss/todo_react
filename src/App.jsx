import { useState, useEffect } from "react";
import ToDo from "./ToDo";
import DiariesList from "./DiariesList";
import "./App.css";

function getLocalTodos() {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}

function getLocalDiaries() {
  const stored = localStorage.getItem("diaries");
  return stored ? JSON.parse(stored) : [];
}

function App() {
  const [todos, setTodos] = useState(getLocalTodos);
  const [diaries, setDiaries] = useState(getLocalDiaries);

  const [newTask, setNewTask] = useState("");
  const [newDiary, setNewDiary] = useState({ title: "", body: "", date: "" });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }, [diaries]);

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTask) return;
    setTodos([...todos, { id: crypto.randomUUID(), task: newTask, completed: false }]);
    setNewTask("");
  }

  function handleToggle(id) {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
}

  function handleAddDiary(e) {
    e.preventDefault();
    const { title, body, date } = newDiary;
    if (!title || !body || !date) {
      alert("Lūdzu aizpildiet visus laukus!");
      return;
    }
    setDiaries([...diaries, { id: crypto.randomUUID(), title, body, date }]);
    setNewDiary({ title: "", body: "", date: "" });
  }

  function handleDelete(id, type) {
    if (type === "todo") {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      setDiaries(diaries.filter(diary => diary.id !== id));
    }
  }

  function handleEdit(id, newContent, type) {
    if (type === "todo") {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, task: newContent } : todo)));
    } else {
      setDiaries(diaries.map(diary => (diary.id === id ? { ...diary, ...newContent } : diary)));
    }
  }

  return (
    <>
      <form onSubmit={handleAddTask}>
        <label>
          Uzdevums:
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>
        <button type="submit">Pievienot uzdevumu</button>
      </form>

      <h1>Veicamie uzdevumi</h1>
          {todos.map(todo => (
            <div key={todo.id}>
              <ToDo
                {...todo}
                onDelete={() => handleDelete(todo.id, "todo")}
                onEdit={(id, val) => handleEdit(id, val, "todo")}
                onToggle={handleToggle}
              />
            </div>
          ))}

      {/* ✅ Dienasgrāmatas veidlapa */}
      <h2>Pievienot jaunu dienasgrāmatas ierakstu</h2>
      <form onSubmit={handleAddDiary}>
        <label>
          Tituls:
          <input
            value={newDiary.title}
            onChange={(e) => setNewDiary({ ...newDiary, title: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Saturs:
          <textarea
            value={newDiary.body}
            onChange={(e) => setNewDiary({ ...newDiary, body: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Datums:
          <input
            type="date"
            value={newDiary.date}
            onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">Pievienot dienasgrāmatu</button>
      </form>

      {/* ✅ Tikai renderēšanas komponents */}
      <h1>Dienasgrāmata</h1>
      <DiariesList
        diaries={diaries}
        onDelete={(id) => handleDelete(id, "diary")}
        onEdit={(id, newFields) => handleEdit(id, newFields, "diary")}
      />
    </>
  );
}

export default App;
