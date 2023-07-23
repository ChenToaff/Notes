import axios from "utils/api";
import "./EditableElement.css";
import useDidMountEffect from "utils/useDidMountEffect";
import { useContext, useState } from "react";
import { editContext } from "pages/Edit";

export default function EditableHeader({ element }) {
  const { updateNote } = useContext(editContext);

  const [value, setValue] = useState(element);
  function deleteElement(element) {
    axios
      .delete(`/element/${element._id}`)
      .then((res) => updateNote(res.data.note));
  }

  useDidMountEffect(() => {
    const delayFn = setTimeout(() => {
      axios.patch(`/element/${element._id}`, {
        content: value.content,
      });
    }, 500);
    return () => clearTimeout(delayFn);
  }, [value]);

  return (
    <div className="input-group" id={element._id}>
      <button onClick={() => deleteElement(element)}>-</button>
      {(({ type, content }) => {
        const props = {
          placeholder: type,
          value: content,
          className: `Edit-${type}`,
          onChange: (e) =>
            setValue((prevValue) => ({
              ...prevValue,
              content: e.target.value,
            })),
        };
        if (type === "Header") return <input {...props}></input>;
        else return <textarea {...props}></textarea>;
      })(value)}
    </div>
  );
}
