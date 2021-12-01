import './App.css';
// import LeftMenu from './Components/LeftBar/LeftMenu.js';
import NavigationBar from './Components/NavigationBar/NavigationBar.js';
import LoginComponent from './Components/LoginComponent/LoginComponent.js';
import AddNewComponent from './Components/AddNewComponent/AddNewComponent.js';
import EditElementComponent from './Components/EditElementComponent/EditElementComponent.js';
import MenuComponent from './Components/MenuComponent/MenuComponent.js';
import ContentComponent from './Components/ContentComponent/ContentComponent.js';

import { useState } from 'react';


function App() {
  
  const [loadedElement, setLoadedElement] = useState(null);
  const [isLoging, setLoginState] = useState(false);
  const [isAdding, setAddingState] = useState(false);
  const [isEditing, setEditingState] = useState(false);
  const [editingElement, setEditingElement] = useState(null);

  return (
    <div className="App">
      <NavigationBar 
        loginState={setLoginState}/>
      <MenuComponent 
        loadedElement={setLoadedElement}
        isAdding={setAddingState}
        isEditing={setEditingState}
        editingElement={setEditingElement}/>
      <ContentComponent
        loadedElement={loadedElement}/>

      {isLoging ? <LoginComponent 
        loginState={setLoginState}/> : null}
      {isAdding ? <AddNewComponent
        addingState={setAddingState}/> : null}
      {isEditing ? <EditElementComponent 
        elementid={editingElement}
        editingState={setEditingState}/> : null}
    </div>
  );
}

export default App;
