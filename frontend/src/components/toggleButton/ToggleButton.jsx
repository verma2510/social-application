import React, { useState } from "react";
import "./toggleButton.css";
import { useNavigate } from "react-router-dom";

const ToggleButton = () => {
  const [active, setActive] = useState("signup");
  const navigate = useNavigate();

  return (
    <div className="toggle-container">
      <button
        // className={`toggle-button ${active === "login" ? "active" : ""}`}
        onClick={() => setActive(navigate("/"))}
      >
        Login
      </button>
      <button
        // className={`toggle-button ${active === "signup" ? "active" : ""}`}
        onClick={() => setActive(navigate("/signup"))}
      >
        Signup
      </button>
    </div>
  );
};

export default ToggleButton;
