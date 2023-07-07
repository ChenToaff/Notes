import Note from "./Note";
import NotesContainer from "components/NotesConntainer";

export default function Home({ notes }) {
  return (
    <NotesContainer>
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </NotesContainer>
  );
}
