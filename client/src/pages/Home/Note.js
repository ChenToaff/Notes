import { useCallback, useRef, useState } from "react";

export default function Note({ title, elements }) {
  return (
    <div className="catg-card  font-italic ">
      <div className="bg-dark text-light rounded note-shadow">
        {title === "" ? <></> : <h1>{title}</h1>}
        {elements.map((element) => (
          <>
            {element.type == "Header" ? (
              <h4>{element.content}</h4>
            ) : (
              <p className="m-0">{element.content}</p>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
