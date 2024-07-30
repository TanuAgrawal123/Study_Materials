import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // JS Function that runs after every specified time
    setInterval(() => {
      setTime(new Date());
    }, 1000); // Update the time every second

    // Cleanup interval on component unmount
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="clock">
      <h1>{formatTime(time)}</h1>
    </div>
  );
}
