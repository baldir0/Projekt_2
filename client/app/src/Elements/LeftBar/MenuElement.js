import React from 'react';

const MenuElement = (props) => {
  return (
    <div className="element" onClick={props.onClick}>
      <div className="element main">
        <img className="image" src={props.src} alt={props.alt}/>
        <p className="text">{props.val}</p>
      </div>
      <div className="button edit" onClick={props.editState}><img src="EditItem.svg" alt="edit"/></div>
    </div>
  )
}

export default MenuElement;