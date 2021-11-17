import React from 'react';
import './TopMenu.css';

const TopMenu = () => {
  return (      
    <div className="menu top">
      <div className="title">
        <span>COOK BOOK</span>
      </div>
    <div className="options">
      <div className="option">
        <span>Sign Up</span>
      </div>
      <div className="option">
        Sign In
      </div>
     </div>
    </div>
  )
}

export default TopMenu;