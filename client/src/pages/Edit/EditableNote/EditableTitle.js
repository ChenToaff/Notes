import axios from "utils/api";
import "./EditableTitle.css";
import { useEffect, useState } from "react";
import useDidMountEffect from "utils/useDidMountEffect";

export default function EditableTitle({ note }) {
  const [value, setValue] = useState(note.title);

  useDidMountEffect(() => {
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
