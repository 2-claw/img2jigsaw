import { useState, useRef } from "react";
import Header from "./components/header.jsx";
import ImagePicker from "./components/imagepicker.jsx";
import PuzzleBoard from "./components/PuzzleBoard.jsx";
import WinModal from "./components/WinModal.jsx";
import Referimg from "./components/referimg.jsx";
import "./App.css";


export default function App() {
  const [puzzleImage, setPuzzleImage] = useState(null);
  const [gridSize, setGridSize] = useState(3);
  const [originalTiles, setOriginalTiles] = useState([]);
  const [tiles, setTiles] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  function sliceImage(img, gridSize) {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const size = Math.min(width, height);
    const startX = (width - size) / 2;
    const startY = (height - size) / 2;

    const tileSize = Math.floor(600 / gridSize);
    const step = size / gridSize;

    const canvas = document.createElement("canvas");
    canvas.width = tileSize;
    canvas.height = tileSize;
    const ctx = canvas.getContext("2d");

    let pieces = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        ctx.drawImage(img, startX + c * step, startY + r * step, step, step, 0, 0, tileSize, tileSize);
        pieces.push({
          id: r * gridSize + c,
          dataUrl: canvas.toDataURL("image/jpeg", 0.92)
        });
      }
    }
    return pieces;
  }

  const playBeep = (freq, duration) => {
    if (muted) return;
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (duration || 0.07));
    } catch (e) { }
  };

  const onStart = (imgElement, selectedGridSize) => {
    const sliced = sliceImage(imgElement, selectedGridSize);
    setPuzzleImage(imgElement);
    setGridSize(selectedGridSize);
    setOriginalTiles(sliced);

    let res = [...sliced];
    for (let i = res.length - 1; i > 0; i--) {
      const idx = Math.floor(Math.random() * (i + 1));
      const temp = res[i];
      res[i] = res[idx];
      res[idx] = temp;
    }
    setTiles(res);

    setStartTime(Date.now());
    setEndTime(null);
    setMoveCount(0);
  };

  const reset = () => {
    let res = [...originalTiles];
    for (let i = res.length - 1; i > 0; i--) {
      const idx = Math.floor(Math.random() * (i + 1));
      const temp = res[i];
      res[i] = res[idx];
      res[idx] = temp;
    }
    setTiles(res);
    setStartTime(Date.now());
    setEndTime(null);
    setMoveCount(0);
  };

  const back = () => {
    setPuzzleImage(null);
    setOriginalTiles([]);
    setTiles([]);
    setStartTime(null);
    setEndTime(null);
    setMoveCount(0);
  };

  const moveTile = (i1, i2) => {
    if (endTime) return;
    const next = [...tiles];
    const t = next[i1];
    next[i1] = next[i2];
    next[i2] = t;

    setTiles(next);
    setMoveCount((m) => m + 1);

    let win = true;
    for (let i = 0; i < next.length; i++) {
      if (next[i].id !== i) {
        win = false;
        break;
      }
    }
    if (win) setEndTime(Date.now());
  };

  const completed = endTime !== null;


  return (
    <main style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
      {puzzleImage ? (
        <>
          <Header
            startTime={startTime}
            endTime={endTime}
            moveCount={moveCount}
            muted={muted}
            onToggleMute={() => setMuted(!muted)}
            onRestart={reset}
          />



          <div style={{ marginTop: "1rem" }}>
            <button
              type="button"
              className="icon-btn backButton"
              onClick={back}

              style={{ width: "100%", marginBottom: "1rem", fontWeight: 600 }}
            >
              ← CHOOSE DIFFERENT IMAGE
            </button>

            <div className="gameLayout">
              <Referimg image={puzzleImage} />

              <PuzzleBoard
                tiles={tiles}
                gridSize={gridSize}
                isComplete={completed}
                onSwap={moveTile}
                onPlayClick={() => playBeep(520)}
                onPlaySnap={() => playBeep(780)}
              />
            </div>
          </div>

          <WinModal
            open={completed}
            moves={moveCount}
            time={endTime ? endTime - startTime : 0}
            onPlayAgain={reset}
          />
        </>
      ) : (
        <ImagePicker onStart={onStart} />
      )}
    </main>
  );
}