import { useContext } from "react";
import "./ColorPicker.css";
import { editContext } from "..";
import axios from "utils/api";

export default function ColorPicker({ note }) {
  const { updateNote } = useContext(editContext);

  function changeColor(color) {
    axios
      .patch(`/notes/${note._id}`, { color })
      .then(() => updateNote({ ...note, color: color }));
  }
  return (
    <button className="color-picker">
      <div className="tooltiptext">
        {["#fff", "#fff475", "#ccff90", "#cbf0f8", "#e8eaed"].map((color) => (
          <div
            className={
              "mini-circle " + (note.color == color ? "selected" : null)
            }
            data-color={color}
            onClick={() => changeColor(color)}
          ></div>
        ))}
      </div>
    </button>
  );
}
