import axios from "axios";

export default function EditableElement({ element, replaceNote }) {
  function deleteElement(element) {
    axios
      .delete(`/element/${element._id}`)
      .then((res) => replaceNote(res.data.note));
  }

  function editElement(content) {
    axios.patch(`/element/${element._id}`, {
      content,
    });
  }
  return (
    <div className="input-group" id={element._id}>
      <button onClick={() => deleteElement(element)}>-</button>
      {(({ type, content }) => {
        const props = {
          placeholder: type,
          defaultValue: content,
          className: `Edit-${type}`,
          onChange: (e) => editElement(e.target.value),
        };
        if (type === "Header") return <input {...props}></input>;
        else return <textarea {...props}></textarea>;
      })(element)}
    </div>
  );
}
