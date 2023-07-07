import NotesContainer from "components/NotesConntainer";
import EditableNote from "pages/Edit/EditableNote";
import AddNote from "./AddNoteBtn";
import "./Edit.css";

export default function Edit({ notes }) {
  return (
    <>
      <NotesContainer>
        {notes.map((note) => (
          <EditableNote key={note._id} note={note}></EditableNote>
        ))}
      </NotesContainer>

      <AddNote />
    </>
  );
}
