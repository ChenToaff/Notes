import Image from "components/Image";
import "./Note.css";

export default function Note({ note }) {
  return (
    <div className="catg-card font-italic ">
      <div data-color={note.color} className="rounded note-shadow">
        <h1>{note.title}</h1>
        <p className="m-0">{note.text}</p>
        <Image image={note.image} />
      </div>
    </div>
  );
}
