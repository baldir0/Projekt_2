// Modules
import { useState, useEffect } from 'react'
import axios from 'axios'

// Components
import MenuElement from './MenuElement/MenuElement.js'
import MenuPanel from './MenuPanel/MenuPanel.js'

import './MenuComponent.css';

const LOADING_ERROR_MESSAGE = 'Failed To Load Data'

const MenuComponent = ((props) => {

  const [MenuElements, setMenuElements] = useState(['Init Data']);

  const refresh = () => {
    fetchMenuElements();
  }

  const deleteElement = (id) => {
    axios.delete(`http://localhost:3001/api/delete/delete-recipe/${id}`)
      .then((res) => refresh())
  }

  // Fetch Menu Elements From DataBase
  // Fetch Method
  const fetchMenuElements = async () => {
    setMenuElements('Fetching ...')
    return await axios.get("http://localhost:3001/api/get/recipes")
      .then((res) => {
        if (res.status !== 200) setMenuElements(LOADING_ERROR_MESSAGE);

        return setMenuElements(res.data.map((data) => {
          return <MenuElement 
            key={data.id}
            data={
            {
              key: data.id,
              title: data.title,
              id: data.id,
              icon: `http://localhost:3001/api/get/image/${data.icon}`
            }
            }
            loadedElement={props.loadedElement} 
            editElement={props.isEditing}
            editElementId={props.editingElement}
            deleteElement={deleteElement}/>
        }));
      })
      .catch((err) => {
        console.error(err)
        setMenuElements(LOADING_ERROR_MESSAGE);
      })
  }

  // Only on page load
  useEffect(() => {
    fetchMenuElements()
  }, [])


  return (
    <div className='menu'>
      <span className='text-banner'>Recipe List</span>
      <div className="recipe-list">
      {
        // If MenuLength === 0 => Error Message
        // Else MenuElements
        MenuElements ? MenuElements : <span className="error-message">{MenuElements}</span>
      }
      </div>
      <MenuPanel 
        refresh={refresh} 
        isAdding={props.isAdding}/>
    </div>
    )
})

export default MenuComponent;