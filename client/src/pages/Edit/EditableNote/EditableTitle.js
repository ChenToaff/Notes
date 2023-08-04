import axios from "utils/api";
import { useState } from "react";
import useUpdateEffect from "utils/useUpdateEffect";
import "./EditableTitle.css";

export default function EditableTitle({ note }) {
  const [value, setValue] = useState(note.title);

  useUpdateEffect(() => {
    const delayFn = setTimeout(() => {
      axios.patch(`/notes/${note._id}`, {
        title: value,
      });
    }, 500);
    return () => clearTimeout(delayFn);
  }, [value]);

  return (
    <input
      placeholder="Title"
      className="Edit-Title"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
}
