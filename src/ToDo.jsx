import { useState, useEffect } from "react";
import './ToDo.css';

function ToDo({id, task, completed, onDelete, onToggle, onEdit }) {
  const [check, setCheck] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
 
    useEffect(() => {
    setCheck(completed);  // ja mainās props, sinhronizē stāvokli
  }, [completed]);


  function handleSave() {
    onEdit(id, editedTask, 'todo');
    setIsEditing(false);
  }

  function handleToggle() {
    setCheck(!check);
    onToggle(id);
  }

  return (
    <article className="todo-item">
    
      <input
        type="checkbox"
        checked={check}
        onChange={handleToggle}
      />

      {isEditing ? (
       
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className="edit-task-input"
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{task}</span>
      )}

      <button onClick={() => setIsEditing(true)}>✏️</button>
      <button onClick={() => onDelete(id)}>❌</button>
    </article>
  );
}

  
  export default ToDo;