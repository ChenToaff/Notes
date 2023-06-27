import add from "images/add.png";
import axios from "axios";

export default function AddNote({ addNote }) {
  return (
    <div className="fixed-bottom m-3">
      <img
        style={{ cursor: "pointer" }}
        src={add}
        height="50px"
        width="50px"
        className="float-right rounded-circle"
        onClick={() => {
          axios
            .post("/note", {})
            .then((res) => addNote(res.data.note))
            .catch((error) => alert("failure!"));
        }}
        alt="add"
      ></img>
    </div>
  );
}
