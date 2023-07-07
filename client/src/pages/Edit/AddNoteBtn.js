import axios from "axios";
import "./AddNoteBtn.css";
import { useContext } from "react";
import { setNotesContext } from "index";

export default function AddNoteBtn() {
  const setNotes = useContext(setNotesContext);
  function addNote(note) {
    setNotes((oldNotes) => [...oldNotes, note]);
  }
  return (
    <div className="fixed-bottom m-3">
      <div
        className="AddNoteBtn note-shadow"
        onClick={() => {
          axios
            .post("/note", {})
            .then((res) => addNote(res.data.note))
            .catch(() => alert("failure!"));
        }}
      />
    </div>
  );
}
