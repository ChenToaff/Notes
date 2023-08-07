import DeleteNoteBtn from "./DeleteNoteBtn";
import EditableTitle from "./EditableTitle";
import ColorPicker from "./ColorPicker";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import AddImageBtn from "./AddImageBtn";
import "./index.css";
import { useState } from "react";
import Loading from "components/Loading";

export default function EditableNote({ note }) {
  const [imageLoading, setImageLoading] = useState(false);

  return (
    <div data-color={note.color} className="Editable-Note rounded">
      <EditableTitle note={note} />
      <DeleteNoteBtn note={note} />
      <EditableText note={note} />
      {imageLoading ? (
        <Loading />
      ) : (
        <EditableImage {...{ note, setImageLoading }} />
      )}
      <div className="input-group ">
        <AddImageBtn {...{ note, setImageLoading }} />
        <ColorPicker note={note} />
      </div>

      <div className="Last-Modified">
        {note.lastModified?.slice(0, 19).replace("T", " ")}
      </div>
    </div>
  );
}
