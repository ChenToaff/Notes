import NotesContainer from "components/NotesContainer";
import { useEffect, useState } from "react";
import Note from "./Note";
import axios from "utils/api";

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("/notes/").then((res) => setNotes(res.data));
  }, []);

  return <NotesContainer NoteType={Note} notes={notes} />;
}
