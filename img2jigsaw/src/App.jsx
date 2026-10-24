import { useState } from "react";
import Header from "./components/header.jsx";
import ImagePicker from "./components/imagepicker.jsx";
import PuzzleBoard from "./components/PuzzleBoard.jsx";
import WinModal from "./components/WinModal.jsx";
import Referimg from "./components/referimg.jsx";
import "./App.css";

const SIMILAR = 0.05;

function difference(a, b) {
  let total = 0;
  let count = 0;

  for (let i = 0; i < a.length; i += 4) {
    total += Math.abs(a[i] - b[i]);
    total += Math.abs(a[i + 1] - b[i + 1]);
    total += Math.abs(a[i + 2] - b[i + 2]);
    count += 3;
  }

  return total / (count * 255);
}

function isSolved(board, targetGroups) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].group !== targetGroups[i]) {
      return false;
    }
  }

  return true;
}

export default function App() {
  const [puzzleImage, setPuzzleImage] = useState(null);
  const [gridSize, setGridSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [targetGroups, setTargetGroups] = useState([]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [muted, setMuted] = useState(false);

  function playBeep() { }

  function sliceImage(img, size) {
    const length = Math.min(img.naturalWidth, img.naturalHeight);
    const startX = (img.naturalWidth - length) / 2;
    const startY = (img.naturalHeight - length) / 2;
    const tileSize = Math.floor(600 / size);
    const step = length / size;

    const canvas = document.createElement("canvas");
    canvas.width = tileSize;
    canvas.height = tileSize;

    const ctx = canvas.getContext("2d");

    const small = document.createElement("canvas");
    small.width = 8;
    small.height = 8;

    const sctx = small.getContext("2d", {
      willReadFrequently: true
    });

    const reps = [];
    const pieces = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const sx = startX + c * step;
        const sy = startY + r * step;

        ctx.clearRect(0, 0, tileSize, tileSize);
        ctx.drawImage(
          img,
          sx, sy, step, step,
          0, 0, tileSize, tileSize
        );

        sctx.clearRect(0, 0, 8, 8);
        sctx.drawImage(
          img,
          sx, sy, step, step,
          0, 0, 8, 8
        );

        const pixels = sctx.getImageData(0, 0, 8, 8).data;

        let group = -1;

        for (let i = 0; i < reps.length; i++) {
          if (difference(reps[i], pixels) <= SIMILAR) {
            group = i;
            break;
          }
        }

        if (group === -1) {
          reps.push(pixels);
          group = reps.length - 1;
        }

        pieces.push({
          id: r * size + c,
          group: group,
          dataUrl: canvas.toDataURL("image/jpeg", 0.92)
        });
      }
    }

    return pieces;
  }

  function shuffle(pieces) {
    const result = [...pieces];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }

    return result;
  }

  function onStart(img, size) {
    const pieces = sliceImage(img, size);
    const groups = pieces.map((piece) => piece.group);

    setPuzzleImage(img);
    setGridSize(size);
    setTargetGroups(groups);
    setTiles(shuffle(pieces));
    setShowNumbers(false);
    setStartTime(Date.now());
    setEndTime(null);
    setMoveCount(0);
  }

  function reset() {
    setTiles(shuffle(tiles));
    setStartTime(Date.now());
    setEndTime(null);
    setMoveCount(0);
  }

  function back() {
    setPuzzleImage(null);
    setTiles([]);
    setTargetGroups([]);
    setStartTime(null);
    setEndTime(null);
    setMoveCount(0);
  }

  function moveTile(from, to) {
    if (endTime !== null || from === to) return;

    const next = [...tiles];

    const temp = next[from];
    next[from] = next[to];
    next[to] = temp;

    setTiles(next);
    setMoveCount(moveCount + 1);

    if (isSolved(next, targetGroups)) {
      setEndTime(Date.now());
    }
  }

  const completed = endTime !== null;

  return (
    <main className="app">
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

          <button className="controlBtn" onClick={back}>
            ← CHOOSE DIFFERENT IMAGE
          </button>

          <button
            className="controlBtn"
            onClick={() => setShowNumbers(!showNumbers)}
            aria-pressed={showNumbers}
          >
            {showNumbers ? "HIDE TILE NUMBERS" : "SHOW TILE NUMBERS"}
          </button>
          <div className="gameLayout">
            <Referimg image={puzzleImage} />

            <PuzzleBoard
              tiles={tiles}
              targetGroups={targetGroups}
              gridSize={gridSize}
              isComplete={completed}
              showNumbers={showNumbers}
              onSwap={moveTile}
            />
          </div>

          <WinModal
            open={completed}
            moves={moveCount}
            time={endTime - startTime}
            onPlayAgain={reset}
          />
        </>
      ) : (
        <ImagePicker onStart={onStart} />
      )}
    </main>
  );
}
