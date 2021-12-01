import './MenuElement.css';

const MenuElement = ((props) => {
  const handleClick = (id) => {
    props.loadedElement(id);
  }

  const handleDelete = () => {
    props.deleteElement(props.data.id);
  }

  const handleEdit = () => {
    props.editElement(true)
    props.editElementId(props.data.id)
  }

  return (
    <div className="element">
      <li className="menu-element" key={props.data.key} onClick={() => handleClick(props.data.id)}>
        <img className="img" src={props.data.icon} alt="" />
        <span className="text" >{props.data.title}</span>
        
      </li>
      <div className="element-side-menu">
        <button className="delete button" onClick={handleDelete}><img src='DeleteItem.svg' alt="delete"></img></button>
        <button className="edit button" onClick={handleEdit}><img src='EditItem.svg' alt="edit"></img></button>
      </div>
    </div>
    )
})

export default MenuElement;
