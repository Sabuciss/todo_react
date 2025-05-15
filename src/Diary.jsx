import { useState } from "react";
import "./DiariesList.css";

function Diary({ id, title, body, date, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);
  const [editedDate, setEditedDate] = useState(date);

  function handleSave() {
    onEdit(id, {
      title: editedTitle,
      body: editedBody,
      date: editedDate,
    });
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  }

  return (
    <article className="diary-entry">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </>
      ) : (
        <>
          <h3 onDoubleClick={() => setIsEditing(true)}>{title}</h3>
          <p onDoubleClick={() => setIsEditing(true)}>{body}</p>
          <div className="diary-date">{date}</div>
        </>
      )}
      {isEditing ? null : <button onClick={() => setIsEditing(true)}>✏️</button>}
      <button onClick={() => onDelete(id)}>❌</button>
    </article>
  );
}

export default Diary;
