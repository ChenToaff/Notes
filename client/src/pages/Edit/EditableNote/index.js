import DeleteNoteBtn from "./DeleteNoteBtn";
import EditableTitle from "./EditableTitle";
import ColorPicker from "./ColorPicker";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import AddImageBtn from "./AddImageBtn";
import "./index.css";

export default function EditableNote({ note }) {
  return (
    <div data-color={note.color} className="Editable-Note rounded">
      <EditableTitle note={note} />
      <DeleteNoteBtn note={note} />
      <EditableText note={note} />
      <EditableImage note={note} />
      <div className="input-group ">
        <AddImageBtn note={note} />
        <ColorPicker note={note} />
      </div>

      <div className="Last-Modified">
        {note.lastModified?.slice(0, 19).replace("T", " ")}
      </div>
    </div>
  );
}
