import axios from "utils/api";
import { useContext } from "react";
import { editContext } from "pages/Edit";
import "./DeleteNoteBtn.css";

export default function DeleteNoteBtn({ note }) {
  const { notes } = useContext(editContext);

  function handleDelete(note) {
    notes.set((oldNotes) =>
      oldNotes.filter((element) => element._id != note._id)
    );
    axios.delete(`/notes/${note._id}`).catch(() => {
      alert("failure!");
      window.location.reload(true);
    });
  }
  return (
    <button className="Delete-Btn" onClick={() => handleDelete(note)}>
      X
    </button>
  );
}
