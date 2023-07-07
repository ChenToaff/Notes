import axios from "axios";

export default function EditableTitle({ note }) {
  return (
    <input
      placeholder="Title"
      className="Edit-Title"
      defaultValue={note.title}
      onChange={(e) =>
        axios.patch(`/note/${note._id}`, {
          ...note,
          title: e.target.value,
        })
      }
    ></input>
  );
}
