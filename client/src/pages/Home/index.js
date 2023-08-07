import NotesContainer from "components/NotesContainer";
import Note from "./Note";

export default function Home({ notes }) {
  return <NotesContainer NoteType={Note} notes={notes.array} />;
}
