import { useRef, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import "./Picker.css";

import swan from "../assets/swan.jpg";
import car from "../assets/car.jpg";
import building from "../assets/architecture.jpg";

const presets = [
  { name: "Swan", src: swan },
  { name: "Car", src: car },
  { name: "Architecture", src: building },
];

export default function Picker({ onStart }) {
  const [src, setSrc] = useState(null);
  const [grid, setGrid] = useState(3);
  const input = useRef(null);

  function setFile(file) {
    if (file && file.type.startsWith("image/")) {
      setSrc(URL.createObjectURL(file));
    }
  }

  async function go() {
    try {
      const res = await fetch(src);
      const blob = await res.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      await img.decode();
      onStart(img, grid);
    } catch (err) {
      alert("Couldn't load that image, try a different one");
    }
  }

  return (
    <div className="pickerScreen">
      <div className="setupBox">
        <div className="setup_header">
          <h1 className="title text">IMAGE2JIGSAW</h1>
          <p className="subtitle">
            Select an image file or choose a preset.
          </p>
        </div>

        <div
          className="dropZone"
          onClick={() => input.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("dragover");
          }}
          onDragLeave={(e) =>
            e.currentTarget.classList.remove("dragover")
          }
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove("dragover");
            setFile(e.dataTransfer.files[0]);
          }}
        >
          {src ? (
            <img src={src} alt="Selected" className="previewImg" />
          ) : (
            <div className="dropContent">
              <Upload size={28} />
              <p className="drop-text">Drop image here or click to browse</p>
              <span className="fileTypes">PNG, JPG, WebP</span>
            </div>
          )}

          <input
            ref={input}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hiddenInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="presets">
          <p className="sectionLabel">Presets</p>

          <div className="presetGrid">
            {presets.map((preset) => (
              <button
                key={preset.name}
                className={
                  src === preset.src
                    ? "presetBtn selected"
                    : "presetBtn"
                }
                onClick={() => setSrc(preset.src)}
              >
                <img src={preset.src} alt={preset.name} />
                <span className="preset_tag">
                  <ImageIcon size={12} /> {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="sizes">
          <p className="sectionLabel">Grid Size</p>

          <div className="sizeGrid">
            {[3, 4, 5, 8, 10].map((size) => (
              <button
                key={size}
                className={
                  grid === size ? "sizeBtn selected" : "sizeBtn"
                }
                onClick={() => setGrid(size)}
              >
                <span className="sizeLabel">{size}x{size}</span>
                <span className="sizeSub">{size * size} pcs</span>
              </button>
            ))}
          </div>
        </div>

        <button className="startBtn" disabled={!src} onClick={go}>
          START PUZZLE
        </button>
      </div>
    </div>
  );
}