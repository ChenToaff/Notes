import EditableHeader from "./EditableHeader";

export default function EditableElements({ elements }) {
  return (
    <div>
      {elements.map((element) => {
        switch ("Header") {
          case "Title":
            return null;
          case "Header":
            return <EditableHeader key={element._id} element={element} />;
          case "Text":
            return null;
          default:
            return null;
        }
      })}
    </div>
  );
}
