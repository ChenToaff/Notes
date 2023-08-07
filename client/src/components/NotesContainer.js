import { useEffect, useRef, useState } from "react";
import "./NotesContainer.css";

export default function NotesContainer({ NoteType, notes }) {
  const containerRef = useRef(null);
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const handleWindowResize = () => {
      const _cols = Math.floor(containerRef.current.clientWidth / 400);
      setCols(_cols === 0 ? 1 : _cols);
    };
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const actualCols = new Array(cols).fill().map(() => []);
  const colsHeight = new Array(cols).fill(0);

  for (let note of notes) {
    let height = 1;
    if (note.image) {
      height = 2;
    }
    const minIndex = colsHeight.indexOf(Math.min(...colsHeight));
    actualCols[minIndex].push(<NoteType key={note._id} note={note} />);
    colsHeight[minIndex] += height;
  }
  return (
    <div ref={containerRef} className="notes-container m-auto">
      <div className="row w-100 m-auto">
        {actualCols.map((element, index) => {
          return (
            <div key={index} className="col">
              {element}
            </div>
          );
        })}
      </div>
    </div>
  );
}
