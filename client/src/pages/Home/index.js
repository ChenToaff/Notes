import NotesContainer from "components/NotesContainer";
import { useEffect, useState } from "react";
import Note from "./Note";
import axios from "utils/api";
import useArray from "utils/useArray";

export default function Home() {
  const notes = useArray([]);

  useEffect(() => {
    axios.get("/notes/").then((res) => notes.set(res.data));
  }, []);

  return <NotesContainer NoteType={Note} notes={notes.array} />;
}
