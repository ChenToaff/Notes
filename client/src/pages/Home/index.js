import { useCallback, useEffect, useRef, useState } from "react";
import Note from "./Note";
import "css/NotesContainer.css";
export default function Home({ notes }) {
  // console.log({ notes });
  const containerRef = useRef(null);
  const [cols, setCols] = useState();

  useEffect(() => {
    const handleWindowResize = () => {
      setCols(Math.floor(containerRef.current.clientWidth / 400));
    };
    setCols(Math.floor(containerRef.current.clientWidth / 400));

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div ref={containerRef} className="notes-container m-auto">
      <div class="row">
        {Array(cols)
          .fill(0)
          .map((element, index) => (
            <div class="col">
              {notes.map((item, i) =>
                i % cols == index ? (
                  <Note title={item.title ?? ""} elements={item.elements} />
                ) : (
                  <></>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
