import { useState, useEffect } from "react";

export default function ProgBar() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
const genRand=()=>{
    return Math.random()*10
}
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev +genRand(); // Smaller increments for smooth effect
      });
    }, 100); // Updates every 100ms for smooth transition

    return () => clearInterval(interval);
  }, [loading]);

  const startLoading = () => {
    setProgress(0);
    setLoading(true);
  };

  return (
    <div>
      <h1>Progress: {progress.toFixed(0)}%</h1>
      <div className="pbar" style={{ border: "2px solid black", width: "300px" }}>
        <div
          className="status"
          style={{
            height: "20px",
            width: `${progress}%`,
            backgroundColor: "green",
            transition: "width 0.1s ease-in-out", // Faster & smoother transition
          }}
        ></div>
      </div>
      <button onClick={startLoading} disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Loading..." : "Start"}
      </button>
    </div>
  );
}
