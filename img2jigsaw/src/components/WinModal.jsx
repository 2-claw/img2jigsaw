import React, { useEffect, useRef } from "react";
import { Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import "./WinPopup.css";
export default function WinPopup({ open, time, moves, onPlayAgain }) {
  const dialogRef = useRef(null);

  const seconds = Math.floor(time / 1000);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const timeStr = m + ":" + (s < 10 ? "0" + s : s);

  useEffect(() => {
    if (open) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal();
      }
      confetti({
        particleCount: 95,
        spread: 68,
        startVelocity: 38,
        ticks: 175,
        origin: { x: 0.5, y: 0.65 }
      });
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="winModal"
      onClose={onPlayAgain}
    >
      <div className="win_box">
        <div className="trophyBox">
          <Trophy size={36} />
        </div>

        <h2 className="win-title">You did it!!</h2>
        <p className="winSub">Nice job solving it</p>

        <div className="stats">
          <div className="statBox">
            <span className="statLabel">Time</span>
            <span className="statValue">{timeStr}</span>
          </div>

          <div className="w_px" />

          <div className="statBox">
            <span className="statLabel">Moves</span>
            <span className="statValue">{moves}</span>
          </div>
        </div>

        <button className="playAgain" onClick={() => dialogRef.current.close()}>
          Play Again
        </button>
      </div>
    </dialog>
  );
}