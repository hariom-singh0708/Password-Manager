import React, { useState } from "react";

function randomChar(set, count = 1) {
  return Array.from({ length: count }, () => set[Math.floor(Math.random() * set.length)]).join("");
}

export default function PasswordGenerator({ onGenerated }) {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const lowers = "abcdefghijklmnopqrstuvwxyz";
    const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let available = "";
    if (useLower) available += lowers;
    if (useUpper) available += uppers;
    if (useNumbers) available += numbers;
    if (useSymbols) available += symbols;
    if (!available) return alert("Select at least one character type!");

    let pwd = "";
    // Ensure at least one from each chosen set
    if (useLower) pwd += randomChar(lowers);
    if (useUpper) pwd += randomChar(uppers);
    if (useNumbers) pwd += randomChar(numbers);
    if (useSymbols) pwd += randomChar(symbols);

    while (pwd.length < length) {
      pwd += randomChar(available);
    }

    // Shuffle and trim to length
    pwd = pwd.split("").sort(() => 0.5 - Math.random()).join("").slice(0, length);

    setResult(pwd);
    if (onGenerated) onGenerated(pwd);
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Optional password strength calculation
  const getStrength = () => {
    let score = 0;
    if (useLower) score += 1;
    if (useUpper) score += 1;
    if (useNumbers) score += 1;
    if (useSymbols) score += 1;
    if (length >= 12) score += 1;
    switch (score) {
      case 5: return "Very Strong";
      case 4: return "Strong";
      case 3: return "Medium";
      case 2: return "Weak";
      default: return "Very Weak";
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-3">
      <h5 className="fw-bold mb-3">Generate Password</h5>

      {/* Password Length */}
      <div className="mb-3">
        <label className="form-label">Length: {length}</label>
        <input
          type="range"
          min="6"
          max="64"
          value={length}
          className="form-range"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      {/* Character Type Toggles */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={useLower}
            onChange={(e) => setUseLower(e.target.checked)}
            id="lowerSwitch"
          />
          <label className="form-check-label" htmlFor="lowerSwitch">Lowercase</label>
        </div>

        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={useUpper}
            onChange={(e) => setUseUpper(e.target.checked)}
            id="upperSwitch"
          />
          <label className="form-check-label" htmlFor="upperSwitch">Uppercase</label>
        </div>

        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            id="numberSwitch"
          />
          <label className="form-check-label" htmlFor="numberSwitch">Numbers</label>
        </div>

        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            id="symbolSwitch"
          />
          <label className="form-check-label" htmlFor="symbolSwitch">Symbols</label>
        </div>
      </div>

      {/* Generate Button */}
      <div className="d-flex gap-2 mb-2">
        <button className="btn btn-primary flex-grow-1" onClick={generate}>Generate</button>
        <button className="btn btn-outline-secondary" onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Result & Strength */}
      {result && (
        <>
          <input
            className="form-control mb-2"
            value={result}
            readOnly
          />
          <small className="text-muted">Strength: {getStrength()}</small>
        </>
      )}
    </div>
  );
}
