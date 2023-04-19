import { useEffect, useMemo, useState } from "react";
import "../styles/timer.css";

const SECOND: Number = 1000;
// const MINUTE = SECOND * 60;

const Timer = ({ deadline = Date.now() + 30100 }) => {
  const memoizedDeadline = useMemo(() => deadline, [deadline]);
  const [time, setTime] = useState(memoizedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(memoizedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  if (time < 1) {
    return (
      <div
        className="timer"
        style={{ backgroundColor: "red", fontSize: "100%" }}
      >
        Time up!
      </div>
    );
  } else {
    return (
      <div>
        {Object.entries({
          // Minutes: (time / MINUTE) % 60,
          Seconds: (time / SECOND) % 60,
        }).map(([label, value]) => (
          <div key={label} className="timer">
            <div className="box">
              <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
              {/* <span className="text">{label}</span> */}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Timer;
