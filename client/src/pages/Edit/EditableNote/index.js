import axios from "utils/api";
import React, { useContext } from "react";
import EditableElements from "./EditableElements";
import DeleteNoteBtn from "./DeleteNoteBtn";
import EditableTitle from "./EditableTitle";
import "./index.css";
import { editContext } from "pages/Edit";
import ColorPicker from "./ColorPicker";

export default function EditableNote({ note }) {
  const { updateNote } = useContext(editContext);

  function addElement(note, Type = null) {
    axios
      .post(`/element`, {
        type: Type,
        content: "",
        noteId: note._id,
      })
      .then((res) => updateNote(res.data.note))
      .catch(() => {
        alert("failure!");
        window.location.reload(true);
      });
  }

  return (
    <div data-color={note.color} className="Editable-Note rounded">
      <EditableTitle note={note} />
      <DeleteNoteBtn note={note} />
      <EditableElements {...{ elements: note.elements }} />

      <div className="input-group ">
        <button onClick={() => addElement(note, "Header")}>+ Header</button>
        <button onClick={() => addElement(note, "Text")}>+ Text</button>
        <ColorPicker {...{ note }} />
      </div>

      <div className="Last-Modified">
        {note.lastModified?.slice(0, 19).replace("T", " ")}
      </div>
    </div>
  );
}
