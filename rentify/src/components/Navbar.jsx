import React from 'react';
import "../styles/Navbar.scss"
function TopBar({user}) {
  const logout=()=>{
    localStorage.removeItem("email")
    window.location.reload();
  }
  return (
    <div className="top-bar">
      <div className="left-content">
        <div className="company-name">Rentify</div>
      </div>
      <div className="right-content">
        <div className="options">
          <a href="#">List Property</a>
          <a href="#">Rent Property</a>
          {
            user? <a href="#" onClick={logout}>Logout</a>:<a href="/login">Login</a>
          }
        </div>
      </div>
    </div>
  );
}

export default TopBar;
