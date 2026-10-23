import { useEffect, useState } from "react";
import { RotateCcw, Volume2, VolumeX, Timer, Move } from "lucide-react";
import "./TopBar.css";

export default function TopBar(props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!props.startTime || props.endTime) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [props.startTime, props.endTime]);

  let ms = 0;
  if (props.startTime) {
    ms = (props.endTime || now) - props.startTime;
  }

  const total = Math.floor(ms / 1000);
  let m = Math.floor(total / 60);
  let s = total % 60;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  return (
    <header className="card">
      <h1 className="text">img2jigsaw</h1>

      <div className="top_buttons">
        <div className="clock">
          <Timer size={16} />
          <span>{m}:{s}</span>
        </div>

        <div className="moveCount">
          <Move size={16} />
          <span>{props.moveCount}</span>
        </div>

        <button className="iconBtn" onClick={props.onToggleMute} title={props.muted ? "Unmute" : "Mute"}>
          {props.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <button className="iconBtn restart" onClick={props.onRestart} title="Restart">
          <RotateCcw size={18} />
        </button>
      </div>
    </header>
  );
}