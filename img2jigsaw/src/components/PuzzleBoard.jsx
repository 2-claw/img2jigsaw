import { useState } from "react";
import "./PuzzleBoard.css";

function getGap(gridSize) {
  if (gridSize <= 3) return 6;
  if (gridSize <= 5) return 4;
  if (gridSize <= 10) return 2;
  return 1;
}

export default function PuzzleBoard({
  tiles,
  targetGroups,
  gridSize,
  isComplete,
  showNumbers,
  onSwap,
  onPlayClick,
  onPlaySnap,
}) {
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [hovering, setHovering] = useState(null);

  function isInPlace(tile, position) {
    return tile.group === targetGroups[position];
  }

  function swap(a, b) {
    if (onPlaySnap) onPlaySnap();
    onSwap(a, b);
  }

  function handleClick(position) {
    if (isComplete) return;

    if (selected === null) {
      setSelected(position);
      if (onPlayClick) onPlayClick();
    } else {
      if (selected !== position) swap(selected, position);
      setSelected(null);
    }
  }

  function handleDrop(position) {
    if (dragging !== null && dragging !== position && !isComplete) {
      swap(dragging, position);
    }
    stopDragging();
    setSelected(null);
  }

  function stopDragging() {
    setDragging(null);
    setHovering(null);
  }

  function getTileClass(tile, position) {
    const classes = ["tile"];
    if (selected === position) classes.push("selected");
    if (hovering === position && dragging !== position) classes.push("drop-target");
    if (isInPlace(tile, position) && !isComplete) classes.push("correct");
    return classes.join(" ");
  }

  return (
    <div className="boardWrapper">
      <div
        className="puzzleGrid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: getGap(gridSize),
          maxWidth: gridSize >= 10 ? "min(92vw, 640px)" : 500,
        }}
      >
        {tiles.map((tile, position) => (
          <div
            key={tile.id}
            className={getTileClass(tile, position)}
            style={{
              backgroundImage: `url(${tile.dataUrl})`,
              opacity: dragging === position ? 0.5 : 1,
            }}
            draggable={!isComplete}
            onClick={() => handleClick(position)}
            onDragStart={() => setDragging(position)}
            onDragEnter={() => setHovering(position)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(position)}
            onDragEnd={stopDragging}
          >
            {showNumbers && <span className="tile-number">{tile.id + 1}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}