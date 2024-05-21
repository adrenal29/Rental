import React from 'react';
import '../styles/sellerSideBar.scss'
import { useNavigate } from "react-router-dom";
const SellerSideBar = ({setOption}) => {
    const navigate=useNavigate();
  return (
    <div className="seller-sidebar">
      <h2>Seller</h2>
      <ul>
        <li>
          <button onClick={() => setOption("post")}>
            Post Properties
          </button>
        </li>
        <li>
          <button onClick={() =>setOption("view")}>
            View Properties
          </button>
        </li>
        <li>
          <button onClick={() =>{window.location.href="/"}}>
           Home
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SellerSideBar;
