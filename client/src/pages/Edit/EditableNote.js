import axios from "axios";
import React from "react";

export default function EditableNote({
  note,
  title,
  deleteNote,
  addElementToNote,
}) {
  function addElement(note, Type = null) {
    axios
      .post(`/element`, {
        type: Type,
        content: "",
        noteId: note._id,
      })
      .then((res) => addElementToNote(note, res.data.element))
      .catch((error) => {
        alert("failure!");
        window.location.reload(true);
      });
  }
  return (
    <div className="catg-card">
      <button
        onClick={() => {
          deleteNote(note);
          axios
            .delete(`/note/${note._id}`)
            .then((res) => {})
            .catch((error) => {
              alert("failure!");
              window.location.reload(true);
            });
        }}
        className="float-end Edit-delete"
      >
        X
      </button>
      <div className="bg-dark text-light rounded note-shadow">
        <input
          placeholder="Title"
          className="Edit-Title"
          defaultValue={title}
          onChange={(e) =>
            axios.patch(`/note/${note._id}`, {
              ...note,
              title: e.target.value,
            })
          }
        ></input>
        {note.elements.map((element, j) => (
          <div className="input-group" id={element._id}>
            <button onClick={() => axios.delete(`/element/${element._id}`)}>
              -
            </button>
            {(({ type, content }) => {
              const props = {
                placeholder: type,
                defaultValue: content,
                className: `Edit-${type}`,
                onChange: (e) =>
                  axios.patch(`/element/${element._id}`, {
                    content: e.target.value,
                  }),
              };
              if (type === "Header") return <input {...props}></input>;
              else return <textarea {...props}></textarea>;
            })(element)}
          </div>
        ))}
        {
          <div className="input-group ">
            <button onClick={() => addElement(note, "Header")}>+ Header</button>
            <button onClick={() => addElement(note, "Text")}>+ Text</button>
          </div>
        }
      </div>
    </div>
  );
}
