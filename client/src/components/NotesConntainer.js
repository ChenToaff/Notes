import { useEffect, useRef, useState } from "react";
import ".//NotesContainer.css";
export default function NotesContainer({ children }) {
  const containerRef = useRef(null);
  const [cols, setCols] = useState(1);

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
      <div className="row w-100 m-auto">
        {Array(cols != 0 ? cols : 1)
          .fill(0)
          .map((element, index) => (
            <div key={index} className="col">
              {children.map((child, i) => {
                return i % (cols != 0 ? cols : 1) == index ? child : null;
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
