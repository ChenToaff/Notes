import "./Image.css";
export default function Image({ image }) {
  if (image) {
    return (
      <img
        onClick={() => alert("sd")}
        loading="lazy"
        className="note-image"
        src={image}
      />
    );
  }
}
