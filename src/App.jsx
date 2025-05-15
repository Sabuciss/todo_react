import ToDo from "./ToDo";
import Diary from './DiariesList';
import './App.css';
import { useState, useEffect } from "react";


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

  

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  useEffect(() => {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }, [diaries]);

  const [newTask, setNewTask] = useState("");
  const [newDiary, setNewDiary] = useState({
    title: "",
    body: "",
    date: ""
  });

  function handleAddTask(event) {
    event.preventDefault();
    if (!newTask) return;
    setTodos([...todos, { id: crypto.randomUUID(), task: newTask, completed: false }]);
    setNewTask("");
  }

  function handleAddDiary(event) {
    event.preventDefault();
    const { title, body, date } = newDiary;
    if (!title || !body || !date) {
      alert("Lūdzu aizpildiet visus laukus!");
      return;
    }
    setDiaries([...diaries, { id: crypto.randomUUID(), title, body, date }]);
    setNewDiary({ title: "", body: "", date: "" });
  }

  function handleDelete(id, type) {
    if (type === 'todo') {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      setDiaries(diaries.filter(diary => diary.id !== id));
    }
  }

  function handleEdit(id, newContent, type) {
    if (type === 'todo') {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, task: newContent } : todo)));
    } else {
     setDiaries(diaries.map(diary => (diary.id === id ? { ...diary, ...newContent } : diary)));
    }
  }

  return (
    <>
      {/* Forma uzdevumiem */}
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
        <div className="todo-item" key={todo.id}>
          <ToDo
            {...todo}
            onDelete={() => handleDelete(todo.id, 'todo')}
            onEdit={handleEdit}
          />
        </div>
      ))}

      {/* Forma dienasgrāmatas ierakstiem */}
      <h2>Pievienot jaunu dienasgrāmatas ierakstu</h2>
      <form onSubmit={handleAddDiary}>
        <label>
          Tituls:
          <input
            type="text"
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

      <h1>Dienasgrāmata</h1>
      {diaries.map(diary => (
        <div className="diary-entry" key={diary.id}>
          <Diary
            {...diary}
            onDelete={() => handleDelete(diary.id, 'diary')}
            onEdit={handleEdit}
          />
        </div>
      ))}
    </>
  );
}

export default App;
