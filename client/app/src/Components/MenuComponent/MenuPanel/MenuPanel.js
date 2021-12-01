import './MenuPanel.css';

const MenuPanel = ((props) => {

  const handleRefresh = () => {
    props.refresh();
  }

  const handleAdd = () => {
    props.isAdding(true);
  }

  return (
    <div className="menu-panel">
      <button className="refresh button" onClick={handleRefresh}><img src='RefreshItem.svg' alt="refresh"/></button>
      <button className="add button" onClick={handleAdd}><img src='AddItem.svg' alt="refresh"/></button>
    </div>
  )
})

export default MenuPanel;