import { useState } from "react";
import "./styles/GameWindow.css";

const SYMBOLS = ["❄️", "☃️", "🧊", "☕"];
const results = [1, 1, 1]; // Hardcoded for now

const WIN_MULTIPLIERS = {
  "☃️": { message: "🎉 Snowy Win! x1.5" },
  "🧊": { message: "🎉 Cool Win! x2" },
  "☕": { message: "🎉 Hot Win! x5" },
  "❄️": { message: "🎊 SNOWFLAKE MEGA BIG WIN! x20" },
};

export const GameWindow = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState([SYMBOLS[0], SYMBOLS[0], SYMBOLS[0]]);
  const [betAmount, setBetAmount] = useState("0.00");
  const [buttonText, setButtonText] = useState("Spin");

  const handleBetChange = (e) => {
    let value = e.target.value;
    let normalizedValue = value.replace(",", ".");
    const regex = /^\d*\.?\d*$/;
    if (!regex.test(normalizedValue) && normalizedValue !== "" && normalizedValue !== ".")
      return;

    const digitsOnly = normalizedValue.replace(".", "");
    if (digitsOnly.length > 6) return;

    setBetAmount(value);
  };

  const getSpinResult = () => results.map((index) => SYMBOLS[index]);

  const getWinMessage = (result) => {
    if (result[0] === result[1] && result[1] === result[2]) {
      return WIN_MULTIPLIERS[result[0]].message;
    }
    return "Try again!";
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setButtonText("Spinning...");
    const finalResult = getSpinResult();

    const reelDurations = [2500, 3500, 4500];

    reelDurations.forEach((duration, reelIndex) => {
      let currentSymbolIndex = 0;
      const intervalSpeed = 100;

      const interval = setInterval(() => {
        setReels((prev) => {
          const newReels = [...prev];
          newReels[reelIndex] = SYMBOLS[currentSymbolIndex % SYMBOLS.length];
          return newReels;
        });
        currentSymbolIndex++;
      }, intervalSpeed);

      setTimeout(() => {
        clearInterval(interval);
        setReels((prev) => {
          const newReels = [...prev];
          newReels[reelIndex] = finalResult[reelIndex];
          return newReels;
        });

        if (reelIndex === 2) {
          setTimeout(() => {
            setIsSpinning(false);
            setButtonText("Spin");
            const message = getWinMessage(finalResult);

            if (message !== "Try again!") {
              const overlay = document.createElement("div");
              overlay.className = "win-overlay";

              // Particles
              for (let i = 0; i < 30; i++) {
                const particle = document.createElement("div");
                particle.className = "win-particle";
                particle.style.background = `hsl(${Math.random() * 60 + 170} 100% 60%)`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 0.5}s, ${Math.random()}s`;
                overlay.appendChild(particle);
              }

              const toast = document.createElement("div");
              toast.className = "win-toast";
              toast.textContent = message;

              overlay.appendChild(toast);
              document.body.appendChild(overlay);

              overlay.addEventListener("click", () => overlay.remove());
              setTimeout(() => overlay.remove(), 6000); // last longer
            }
          }, 200);
        }
      }, duration);
    });
  };

  return (
    <div className="slot-machine-container">
      <div className="slot-machine">
        {/* Slot Reels */}
        <div className="reels-container">
          {reels.map((symbol, index) => (
            <div key={index} className="reel">
              <div className={`reel-symbol ${isSpinning ? "spinning" : ""}`}>
                {symbol}
              </div>
            </div>
          ))}
        </div>

        {/* Spin Controls with Bet Input */}
        <div className="spin-controls">
          <div className="bet-input-group">
            <label htmlFor="bet-amount">Bet:</label>
            <input
              id="bet-amount"
              type="text"
              inputMode="decimal"
              value={betAmount}
              onChange={handleBetChange}
              disabled={isSpinning}
              placeholder="0.00"
            />
          </div>

          <button
            onClick={spin}
            disabled={isSpinning}
            className="spin-button"
            onMouseEnter={() => !isSpinning && setButtonText("Spin 🤑")}
            onMouseLeave={() => !isSpinning && setButtonText("Spin")}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameWindow;