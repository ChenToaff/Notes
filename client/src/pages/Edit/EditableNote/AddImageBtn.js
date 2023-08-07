import { useContext } from "react";
import { editContext } from "..";
import axios from "utils/api";
import "./AddImageBtn.css";

export default function AddImageBtn({ note, setImageLoading }) {
  const { updateNote } = useContext(editContext);
  async function uploadImage(e) {
    const formData = new FormData();
    formData.set("image", e.target.files[0]);
    setImageLoading(true);
    const res = await axios.patch(`/notes/${note._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setImageLoading(false);
    updateNote(res.data);
    e.target.value = "";
  }

  return (
    <button className="add-image-btn-container">
      <label>
        <input
          onInput={(e) => uploadImage(e)}
          type="file"
          accept="image/*"
          hidden
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="add-image-btn"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{" "}
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />{" "}
        </svg>
      </label>
    </button>
  );
}
