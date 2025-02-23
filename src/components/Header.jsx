import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo */}
      <h1 className="logo">Carspace</h1>

      {/* Navigation */}
      <nav className="nav">
        {["Home", "About us", "Certified Pre-Owned"].map((item, index) => (
          <a key={index} href="#" className="nav-link">
            {item}
          </a>
        ))}
      </nav>

      {/* Compare Button & Profile */}
      <div className="right-section">
        <button className="compare-button">Compare cars</button>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCicxernIb5W2jIRbjKwiMOVIit_7XJtczA&s"
          alt="Profile"
          className="profile-img"
        />
      </div>
    </header>
  );
};

export default Header;
