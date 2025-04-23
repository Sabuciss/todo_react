import { useState } from "react";
import "./DiariesList.css";

function Diary({ id, title, body, date, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);

  function handleSave() {
    onEdit(id, { body: editedBody });
    setIsEditing(false);
  }

  return (
    <article className="diary-entry">
      <h3>{title} {date}</h3>
      {isEditing ? (
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <p onDoubleClick={() => setIsEditing(true)}>{body}</p>
      )}
      <button onClick={() => setIsEditing(true)}>✏️</button>
      <button onClick={() => onDelete(id)}>❌</button>
    </article>
  );
}

export default Diary;
