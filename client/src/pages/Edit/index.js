import { createContext } from "react";
import EditableNote from "./EditableNote";
import NotesContainer from "components/NotesContainer";
import AddNoteBtn from "./AddNoteBtn";

export const editContext = createContext();

export default function Edit({ notes }) {
  async function updateNote(update) {
    console.log({ update });
    notes.set((oldNotes) =>
      oldNotes.map((item) => {
        if (item._id == update._id) {
          return update;
        }
        return item;
      })
    );
  }

  return (
    <editContext.Provider value={{ notes, updateNote }}>
      <NotesContainer NoteType={EditableNote} notes={notes.array} />
      <AddNoteBtn />
    </editContext.Provider>
  );
}
