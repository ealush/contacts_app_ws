"use client";

import { useState, useEffect } from "react";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";

export default function ThemeControls() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [isHighContrast]);

  const handleReset = () => {
    setIsDarkMode(false);
    setIsHighContrast(false);
  };

  const buttonStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    fontSize: "8px",
    color: "rgba(0,0,0,0.5)",
    transition: "all 0.1s ease",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        display: "flex",
        gap: "8px",
        zIndex: 100, // Above content, below header blur if needed, or higher
        transition: "opacity 0.2s ease",
      }}
      className="theme-controls"
    >
      {/* Red: Reset */}
      <div style={{ position: "relative" }} className="control-dot">
        <button
          onClick={handleReset}
          style={{
            ...buttonStyle,
            backgroundColor: "#FF5F56",
            border: "1px solid #E0443E",
          }}
          title="Reset Theme"
        >
          <span className="icon"><FaTimes /></span>
        </button>
      </div>

      {/* Yellow: High Contrast */}
      <div style={{ position: "relative" }} className="control-dot">
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          style={{
            ...buttonStyle,
            backgroundColor: "#FFBD2E",
             border: "1px solid #DEA123",
          }}
          title="Toggle High Contrast"
        >
          <span className="icon"><FaMinus /></span>
        </button>
      </div>

      {/* Green: Dark Mode */}
      <div style={{ position: "relative" }} className="control-dot">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            ...buttonStyle,
            backgroundColor: "#27C93F",
            border: "1px solid #1AAB29",
          }}
          title="Toggle Dark Mode"
        >
          <span className="icon"><FaPlus /></span>
        </button>
      </div>

      <style jsx>{`
        .theme-controls {
          opacity: 0.1; /* Almost invisible by default */
        }
        .theme-controls:hover {
          opacity: 1;
        }
        .icon {
          opacity: 0;
          transition: opacity 0.1s;
          display: flex;
        }
        .theme-controls:hover .icon {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
