import React, { Component, useState } from "react";

export default function Note({ title, elements }) {
  return (
    <div className="catg-card  font-italic ">
      <div className="bg-secondary text-light rounded">
        {title === "" ? <></> : <h1>{title}</h1>}
        {elements.map((element) => (
          <>
            {element.type == "Header" ? (
              <h4>{element.Content}</h4>
            ) : (
              <p className="m-0">{element.Content}</p>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
