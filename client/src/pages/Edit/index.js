import { useEffect } from "react";
import cookie from "react-cookies";
import logout from "images/logout.png";
import save from "images/save.png";
import "css/Edit.css";
import axios from "axios";
import EditableNote from "pages/Edit/EditableNote";
import "css//NotesContainer.css";
import AddNote from "./AddNote";

export default function Edit({ rightBtn, centerBtn, notes, setNotes }) {
  console.log({ notes });
  useEffect(() => {
    rightBtn.current.href = "/login";
    rightBtn.current.firstChild.src = logout;
    rightBtn.current.onclick = () => cookie.remove("token", { path: "/" });
    centerBtn.current.firstChild.src = save;
    centerBtn.current.onclick = () => saveAll();
  }, []);

  async function saveAll() {
    await axios.post("http://localhost:9000/Notes/changes", notes, {
      headers: { token: cookie.load("token") },
    });
  }

  function deleteNote(note) {
    setNotes((oldNotes) =>
      oldNotes.filter((element) => element._id != note._id)
    );
  }
  function addNote(note) {
    setNotes((oldNotes) => [...oldNotes, note]);
  }
  function addElementToNote(note, element) {
    setNotes((oldNotes) =>
      oldNotes.map((item) => {
        if (item._id == note._id) {
          item.elements.push(element);
        }
        return item;
      })
    );
  }

  function deleteElement(name) {
    let newResponse = notes;
    if (name.includes("E"))
      delete newResponse[parseInt(name[1])]["Elements"][parseInt(name[3])];
    else delete newResponse[parseInt(name[1])];
    setNotes(newResponse);
  }

  return (
    <>
      <div className="notes-container">
        {notes.map((note, i) => (
          <EditableNote
            deleteNote={deleteNote}
            addElementToNote={addElementToNote}
            deleteElement={deleteElement}
            note={note}
            title={note.title}
            i={i}
          ></EditableNote>
        ))}
      </div>
      <AddNote addNote={addNote}></AddNote>
    </>
  );
}
