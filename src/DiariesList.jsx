// DiariesList.jsx
import React, { useState } from 'react';

function Diary({ id, title, body, date, onDelete, onEdit }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedBody, setEditedBody] = useState(body);

  function handleTitleSave() {
    onEdit(id, { title: editedTitle });
    setIsEditingTitle(false);
  }

  function handleBodySave() {
    onEdit(id, { body: editedBody });
    setIsEditingBody(false);
  }

  return (
    <article className="diary-entry">
      <h3>
        {isEditingTitle ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSave} // Saglabāt, kad iznāk ārā
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()} // Enter nospiežot
            autoFocus
          />
        ) : (
          <span onDoubleClick={() => setIsEditingTitle(true)}>{title}</span>
        )}
        <span>{date}</span>
      </h3>
      {isEditingBody ? (
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          onBlur={handleBodySave}
          onKeyDown={(e) => e.key === 'Enter' && handleBodySave()} // Enter nospiežot
          autoFocus
        />
      ) : (
        <p onDoubleClick={() => setIsEditingBody(true)}>{body}</p>
      )}
      <button onClick={() => onDelete(id)}>❌</button>
    </article>
  );
}

export default Diary;
