import React from 'react';

const MenuElement = (props) => {
  return (
    <div className="element">
      <div className="element main" onClick={props.onClick}>
        <img className="image" src={props.src} alt={props.alt}/>
        <p className="text">{props.val}</p>
      </div>
      <div className="element buttons">
        <div className="button edit" onClick={props.editSelected}><img src="EditItem.svg" alt="edit"/></div>
        <div className="button delete" onClick={props.deleteSelected}><img src="DeleteItem.svg" alt="delete"/></div>
      </div>
    </div>
  )
}

export default MenuElement;