import Note from "./Note";
import "css/NotesContainer.css";
export default function Home({ notes }) {
  console.log({ notes });
  return (
    <div className="notes-container m-auto">
      {notes.map((item) => (
        <Note title={item.title ?? ""} elements={item.elements} />
      ))}
    </div>
  );
}
