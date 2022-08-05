import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const FEEDBACK_API_URL =
  "https://m3uhfpe7oc.execute-api.eu-central-1.amazonaws.com/prod/";

function App() {
  const [score, setScore] = useState<string>("0");
  const [message, setMessage] = useState("");

  const sendFeedback = useCallback(() => {
    fetch(FEEDBACK_API_URL, {
      method: "POST",
      body: JSON.stringify({ score, message }),
    });
  }, [score, message]);

  return (
    <>
      <h2>Sende uns dein Feedback!</h2>
      <p>Wie findest du unsere Website?</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setScore(event.target.value);
          }}
        >
          <div>
            <input type="radio" id="score1" name="score" value={1} />
            <label htmlFor="score1">Schlecht</label>
          </div>

          <div>
            <input type="radio" id="score2" name="score" value={2} />
            <label htmlFor="score2">Mittel</label>
          </div>

          <div>
            <input type="radio" id="score3" name="score" value={3} />
            <label htmlFor="score3">Gut</label>
          </div>
        </div>
      </div>
      {score !== "0" && (
        <div
          style={{ display: "flex", flexDirection: "column", width: "200px" }}
        >
          <p>Möchtest du uns sonst noch etwas mitteilen?</p>
          <textarea
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendFeedback}>Abschicken!</button>
        </div>
      )}
    </>
  );
}
