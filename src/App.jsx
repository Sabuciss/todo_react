import ToDo from "./ToDo";
import Diary from "./DiariesList";
import './App.css'
import { useState } from "react";

function App(){

  const [todos, setTodos] = useState([
    { id: 1, task: "Iemācīties React", completed: false },
    { id: 2, task: "Iemācīties Laravel", completed: true },
    { id: 3, task: "Nopirkt pienu", completed: false },
  ]);

  const diaries = [
    { id: 1, title: "Trešdeina, ",  body: "es gribu mājās  ", date: " 2025-04-14 " },
    { id: 2, title: "ceturdiena, ",  body: " diena pirms brivdienām   ", date: " 2025-04-14 " },
    { id: 3, title: "Piektdiena, ",  body: "brivdiena ", date: " 2025-04-14 " },
  ];

  const [newTask, setNewTask] = useState("");

  function handleAdd(event) {
    event.preventDefault();
    console.log("Added");
  }

  return(
      <>
        <form onSubmit={handleAdd}>
          <label>
            <input value={newTask} onChange={(event) => setNewTask(event.target.value)} /> 
          </label>
         <button type="submit">Yipi</button>
        </form>
         <h1>Veicamie uzdevumi</h1>

          {todos.map((todo) => {
              return <ToDo key={todo.id} {...todo} />; 
          })}
           <h1>Dienasgrāmata</h1>

          {diaries.map((diary) => {
              return <Diary key={diary.id} {...diary} />; 
          })}
      </>
  );
  
}

export default App;