import axios from "axios";
import React, { useContext } from "react";
import Element from "./EditableElement";
import DeleteNoteBtn from "./DeleteNoteBtn";
import EditableTitle from "./EditableTitle";
import "./EditableNote.css";
import { setNotesContext } from "index";

export default function EditableNote({ note }) {
  const setNotes = useContext(setNotesContext);

  function replaceNote(note) {
    setNotes((oldNotes) =>
      oldNotes.map((item) => {
        if (item._id == note._id) {
          return note;
        }
        return item;
      })
    );
  }
  function addElement(note, Type = null) {
    axios
      .post(`/element`, {
        type: Type,
        content: "",
        noteId: note._id,
      })
      .then((res) => replaceNote(res.data.note))
      .catch(() => {
        alert("failure!");
        window.location.reload(true);
      });
  }

  return (
    <div className="Editable-Note bg-dark text-light rounded">
      <EditableTitle note={note} />
      <DeleteNoteBtn note={note} />
      {note.elements.map((element) => (
        <Element
          key={element._id}
          element={element}
          replaceNote={replaceNote}
        />
      ))}
      {
        <div className="input-group ">
          <button onClick={() => addElement(note, "Header")}>+ Header</button>
          <button onClick={() => addElement(note, "Text")}>+ Text</button>
        </div>
      }
      <div className="Last-Modified">
        {note.lastModified?.slice(0, 19).replace("T", " ")}
      </div>
    </div>
  );
}
