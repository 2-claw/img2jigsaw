import { useState } from 'react';
import "./PuzzleBoard.css";

export default function PuzzleBoard({ tiles, gridSize, isComplete, onSwap, onPlayClick, onPlaySnap }) {
    const [sel, setSel] = useState(-1);
    const [from, setFrom] = useState(-1);
    const [over, setOver] = useState(-1);

    let gap = 1;
    if (gridSize <= 10) gap = 2;
    if (gridSize <= 5) gap = 4;
    if (gridSize <= 3) gap = 6;

    function clicked(i) {
        if (isComplete) return;
        if (sel === -1) {
            setSel(i);
            onPlayClick && onPlayClick();
            return;
        }
        if (sel !== i) {
            onPlaySnap && onPlaySnap();
            onSwap(sel, i);
        }
        setSel(-1);
    }

    function drop(i) {
        if (from > -1 && from !== i) {
            onPlaySnap && onPlaySnap();
            onSwap(from, i);
            setSel(-1);
        }
        setFrom(-1);
        setOver(-1);
    }

    return (
        <div className="boardWrapper">
            <div
                className="puzzleGrid"
                style={{
                    gridTemplateColumns: 'repeat(' + gridSize + ', 1fr)',
                    gap: gap,
                    maxWidth: gridSize >= 10 ? 'min(92vw, 640px)' : 500,
                    aspectRatio: '1 / 1'
                }}
            >
                {tiles.map((t, i) => (
                    <div
                        key={t.id}
                        draggable={!isComplete}
                        onDragStart={() => setFrom(i)}
                        onDragEnter={() => setOver(i)}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => drop(i)}
                        onDragEnd={() => { setFrom(-1); setOver(-1); }}
                        onClick={() => clicked(i)}
                        className={
                            'tile' +
                            (sel === i ? ' selected' : '') +
                            (over === i && from !== i ? ' drop-target' : '') +
                            (t.id === i && !isComplete ? ' correct' : '')
                        }
                        style={{
                            backgroundImage: 'url(' + t.dataUrl + ')',
                            backgroundSize: 'cover',
                            aspectRatio: '1 / 1',
                            opacity: from === i ? 0.5 : 1,
                            cursor: isComplete ? 'default' : 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}