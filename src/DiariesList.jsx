import { useState, useEffect } from "react";
import Diary from "./Diary"; // Importē Diary komponenti

// Funkcija, kas nolasa dienasgrāmatas no localStorage
function getLocalDiaries() {
  const stored = localStorage.getItem("diaries");
  return stored ? JSON.parse(stored) : [];
}

function DiariesList() {
  const [diaries, setDiaries] = useState(getLocalDiaries);

  useEffect(() => {
    localStorage.setItem("diaries", JSON.stringify(diaries));
  }, [diaries]);

  function handleDelete(id) {
    setDiaries(diaries.filter(d => d.id !== id));
  }

  function handleEdit(id, updatedFields) {
    setDiaries(diaries.map(d => (d.id === id ? { ...d, ...updatedFields } : d)));
  }

  return (
    <>
      {diaries.length === 0 && <p>Nav nevienas dienasgrāmatas.</p>}
      {diaries.map(({ id, title, body, date }) => (
        <Diary
          key={id}
          id={id}
          title={title}
          body={body}
          date={date}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </>
  );
}

export default DiariesList;
