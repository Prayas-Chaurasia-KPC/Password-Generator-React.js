import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Main() {
  const [passWord, setpassWord] = useState("");
  const [Length, setlength] = useState(10);
  const [numberChange, setnumberChange] = useState(false);
  const [charChange, setcharChange] = useState(false);

  // Generate password
  const genPWD = useCallback(() => {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberChange) {
      letters += "0123456789";
    }

    if (charChange) {
      letters += "!@#$%^&*()_+[]{}|;:,.<>?/~";
    }

    let pass = "";
    for (let i = 0; i < Length; i++) {
      pass += letters[Math.floor(Math.random() * letters.length)];
    }
    setpassWord(pass);
  }, [Length, numberChange, charChange]);

  // Run generator whenever options change
  useEffect(() => {
    genPWD();
  }, [genPWD]);

  // Copy password to clipboard
  function copyPassword() {
    navigator.clipboard.writeText(passWord);
    alert("Password copied to clipboard!");
  }

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#333" }}>🔑 Password Generator</h1>

      <h2
        style={{
          background: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          display: "inline-block",
          minWidth: "200px"
        }}
      >
        {passWord}
      </h2>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={copyPassword}
          style={{
            margin: "10px",
            padding: "8px 15px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Copy Password
        </button>

        <button
          onClick={genPWD}
          style={{
            margin: "10px",
            padding: "8px 15px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Regenerate
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Length: </label>
        <input
          type="range"
          min={8}
          max={50}
          value={Length}
          onChange={(e) => setlength(Number(e.target.value))}
        />
        <span> {Length}</span>

        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={numberChange}
            onChange={() => setnumberChange(!numberChange)}
          />
          <label> Include Numbers</label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={charChange}
            onChange={() => setcharChange(!charChange)}
          />
          <label> Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

createRoot(document.querySelector(".root")).render(<Main />);
