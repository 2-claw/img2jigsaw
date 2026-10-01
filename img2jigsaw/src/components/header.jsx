import { useEffect, useState } from "react";
import { RotateCcw, Volume2, VolumeX, Timer, Move } from "lucide-react";

export default function Header({
  startTime,
  endTime,
  moveCount,
  muted,
  onToggleMute,
  onRestart
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime || endTime) return;

    const update = () => setElapsed(Date.now() - startTime);
    update();

    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const time = endTime ? endTime - startTime : elapsed;
  const seconds = Math.max(0, Math.floor(time / 1000));
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");

  return (
    <header className="card">
      <h1 className="text">img2jigsaw</h1>

      <div className="buttons-above">
        <div className="timer">
          <Timer size={16} />
          <span>{min}:{sec}</span>
        </div>

        <div className="moves">
          <Move size={16} />
          <span>{moveCount}</span>
        </div>

        <button
          className="icon-btn"
          onClick={onToggleMute}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button
          className="icon-btn restart"
          onClick={onRestart}
          aria-label="Restart"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </header>
  );
}

