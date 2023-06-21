import React, { Component, useState } from "react";
import Note from "./Note";

export default function Home({ apiResponse }) {
  return (
    <div className="m-auto text-center">
      {apiResponse.map((item) => (
        <Note title={item.Title ?? ""} elements={item.Elements} />
      ))}
    </div>
  );
}
