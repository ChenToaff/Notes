import axios from "axios";
import { setNotesContext } from "index";
import { useContext } from "react";

export default function DeleteNoteBtn({ note }) {
  const setNotes = useContext(setNotesContext);

  function handleDelete(note) {
    setNotes((oldNotes) =>
      oldNotes.filter((element) => element._id != note._id)
    );
    axios.delete(`/note/${note._id}`).catch(() => {
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
