import { useState } from "react";
import './ToDo.css';

function ToDo({id, task, completed, onDelete, onToggle, onEdit }) {
  const [check, setCheck] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  
  function handleSave() {
    onEdit(id, editedTask);
    setIsEditing(false);
  }
  

  return (
    <article className="todo-item">

      {isEditing ? (
        <input
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onBlur={handleSave} // automātiska saglabāšana kad klikšķē ārpusē
          onKeyDown={(e) => e.key === "Enter" && handleSave()} // Enter nospiežot
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