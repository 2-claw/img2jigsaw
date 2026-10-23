
import "./referimg.css";
export default function Referimg({ image }) {
  if (!image) return null;

  return (
    <aside className="referenceImage">
      <h3>Original Image</h3>
      <img src={image.src} alt="Original puzzle reference" />
    </aside>
  );
}
