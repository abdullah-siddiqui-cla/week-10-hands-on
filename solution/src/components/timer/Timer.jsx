import { useEffect, useState } from "react";

/**
 * Visit timer: demonstrates useEffect with an interval + cleanup on unmount.
 * Each page that includes <Timer /> gets its own counter for that visit.
 */
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    // Cleanup function
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="text-sm text-amber-800/90">
      Shop timer:{" "}
      <strong className="font-mono text-amber-950">{seconds}s</strong> on this
      page
    </p>
  );
}

export default Timer;
