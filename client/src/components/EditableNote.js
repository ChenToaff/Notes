import React, { Component, useState } from "react";

export default function EditableNote({
  note,
  i,
  handleChange,
  deleteElement,
  addElement,
  title,
}) {
  return (
    <div className="catg-card">
      <button
        onClick={() => {
          deleteElement("N" + i);
        }}
        className="float-right Edit-delete"
      >
        X
      </button>
      <div className="bg-dark text-light rounded">
        <input
          id={"C" + i}
          placeholder="Title"
          className="Edit-Title"
          defaultValue={title}
          onChange={handleChange}
        ></input>
        {
          <>
            {note.Elements.map((element, j) => (
              <>
                <div className="input-group">
                  <button
                    onClick={() => {
                      deleteElement(`C${i}E${j}`);
                    }}
                  >
                    -
                  </button>
                  {element.Type === "Header" ? (
                    <input
                      className="Edit-h"
                      placeholder="Header"
                      defaultValue={element.Content}
                      onChange={handleChange}
                    />
                  ) : (
                    <textarea
                      className="Edit-p"
                      placeholder="Text"
                      defaultValue={"" + element.Content}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </>
            ))}
            {
              <div className="input-group ">
                <button
                  onClick={() => {
                    addElement("A" + i, "Header");
                  }}
                >
                  + Header
                </button>
                <button
                  onClick={() => {
                    addElement("A" + i, "Text");
                  }}
                >
                  + Text
                </button>
              </div>
            }
          </>
        }
      </div>
    </div>
  );
}
