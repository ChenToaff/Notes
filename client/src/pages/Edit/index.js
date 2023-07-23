import { createContext, useEffect, useState } from "react";
import EditableNote from "./EditableNote";
import NotesContainer from "components/NotesContainer";
import AddNoteBtn from "./AddNoteBtn";
// const axios = require("utils/api");
import axios from "utils/api";
export const editContext = createContext();

export default function Edit() {
  const [notes, setNotes] = useState([]);

  function updateNote(note) {
    setNotes((oldNotes) =>
      oldNotes.map((item) => {
        if (item._id == note._id) {
          return { ...note, lastModified: new Date().toISOString() };
        }
        return item;
      })
    );
  }
  useEffect(() => {
    axios.get("/notes").then((res) => setNotes(res.data));
  }, []);

  return (
    <editContext.Provider value={{ setNotes, notes, updateNote }}>
      <NotesContainer NoteType={EditableNote} notes={notes} />
      <AddNoteBtn />
    </editContext.Provider>
  );
}
