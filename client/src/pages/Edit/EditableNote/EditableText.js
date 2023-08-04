import axios from "utils/api";
import "./EditableText.css";
import { useState } from "react";
import useUpdateEffect from "utils/useUpdateEffect";

export default function EditableText({ note }) {
  const [value, setValue] = useState(note.text);

  useUpdateEffect(() => {
    const delayFn = setTimeout(() => {
      axios.patch(`/notes/${note._id}`, {
        text: value,
      });
    }, 500);
    return () => clearTimeout(delayFn);
  }, [value]);

  return (
    <div
      placeholder="Your text goes here"
      className="text-box"
      contentEditable="true"
      suppressContentEditableWarning
      onInputCapture={(e) => setValue(e.currentTarget.textContent)}
    >
      {note.text}
    </div>
  );
}
