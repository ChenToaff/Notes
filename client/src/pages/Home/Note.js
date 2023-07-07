import "./Note.css";

export default function Note({ note }) {
  return (
    <div className="catg-card font-italic ">
      <div className="bg-dark text-light rounded note-shadow">
        <h1>{note.title}</h1>
        {note.elements.map((element) =>
          element.type == "Header" ? (
            <h4 key={element._id}>{element.content}</h4>
          ) : (
            <p key={element._id} className="m-0">
              {element.content}
            </p>
          )
        )}
      </div>
    </div>
  );
}
