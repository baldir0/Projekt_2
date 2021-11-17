import './App.css';
import LeftMenu from './Elements/LeftBar/LeftMenu.js';
import TopMenu from './Elements/TopBar/TopMenu.js';
import Content from './Elements/Content/Content.js'

import { useState } from 'react';


function App() {
  
  const [loadedElement, setLoadedElement] = useState(null);

  return (
    <div className="App">
      <div className="Top">
        <TopMenu />
      </div>
      <div className="Main">
        <LeftMenu setLoadedElement={setLoadedElement}/>
        <Content loadedElement={loadedElement}/>
      </div>
    </div>
  );
}

export default App;
