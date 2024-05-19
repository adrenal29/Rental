import React from 'react';
import "../styles/Navbar.scss"
function TopBar() {
  return (
    <div className="top-bar">
      <div className="left-content">
        <div className="company-name">Rentify</div>
      </div>
      <div className="right-content">
        <div className="options">
          <a href="#">User</a>
          <a href="#">List Property</a>
          <a href="#">Rent Property</a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
