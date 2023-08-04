import { createContext, useEffect, useState } from "react";
import EditableNote from "./EditableNote";
import NotesContainer from "components/NotesContainer";
import AddNoteBtn from "./AddNoteBtn";
import axios from "utils/api";
import useArray from "utils/useArray";
export const editContext = createContext();

export default function Edit() {
  const notes = useArray([]);

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
  useEffect(() => {
    axios.get("/notes").then((res) => notes.set(res.data));
  }, []);

  return (
    <editContext.Provider value={{ notes, updateNote }}>
      <NotesContainer NoteType={EditableNote} notes={notes.array} />
      <AddNoteBtn />
    </editContext.Provider>
  );
}
