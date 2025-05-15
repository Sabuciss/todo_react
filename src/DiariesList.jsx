import Diary from "./Diary";

function DiariesList({ diaries, onDelete, onEdit }) {
  return (
    <>
      {diaries.map(({ id, title, body, date }) => (
        <Diary
          key={id}
          id={id}
          title={title}
          body={body}
          date={date}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

export default DiariesList;
