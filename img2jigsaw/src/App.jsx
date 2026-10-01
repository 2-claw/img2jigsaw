import { useState } from "react";
import "./App.css"; 

import Header from "./components/header.jsx";

export default function App() {
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [muted, setMuted] = useState(false);

  const handleRestart = () => {
    setStartTime(Date.now());
    setEndTime(null);
    setMoveCount(0);
  };

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <main style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}>
      <Header
        startTime={startTime}
        endTime={endTime}
        moveCount={moveCount}
        muted={muted}
        onToggleMute={handleToggleMute}
        onRestart={handleRestart}
      />

     
    </main>
  );
}