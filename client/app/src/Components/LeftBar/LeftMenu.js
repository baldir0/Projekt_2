import React, { useState, useEffect } from 'react';
import MenuElement from './MenuElement.js';
import axios from 'axios';

import getCookieValue from '../../cookie';
import {validateSession, getUserPermissions} from '../login';

import './LeftMenu.css';

const LeftMenu = (props) => {
  const [state, setState] = useState(null);
  const [elements, setElements] = useState(<div className="loading">Loading Data...</div>);

  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [ingredients, setIngredients] = useState("Ingredients");
  const [steps, setSteps] = useState("Steps");
  const [files, setFiles] = useState([]);


  useEffect( () => {

    axios.get("http://localhost:3001/api/get/recipes")
      .then( (res) => {
        if (res.status !== 200) {
          return setElements(<div className="error">Loading Failed!</div>);
        }

        return setElements(res.data.map( (r) => {
          return <MenuElement 
          val={r.title} 
          key={r.id} 
          elementId={r.id} 
          onClick={() => props.setLoadedElement(r.id)} 
          editSelected={() => editSelected(r.id)}
          deleteSelected={() => deleteSelected(r.id)}
          src={`http://localhost:3001/api/get/image/${r.icon}`} />
        }));
      })
  }, [props]);
  
  const refresh = () => {
    setElements(<div className="loading">Refreshing...</div>)
    axios.get("http://localhost:3001/api/get/recipes")
    .then( (res) => {
      if (res.status !== 200) {
        return setElements(<div className="error">Loading Failed!</div>);
      }
  
      return setElements(res.data.map( (r) => {
        return <MenuElement 
          val={r.title} 
          key={r.id} 
          elementId={r.id} 
          onClick={() => props.setLoadedElement(r.id)} 
          editSelected={() => editSelected(r.id)}
          deleteSelected={() => deleteSelected(r.id)}
          src={`http://localhost:3001/api/get/image/${r.icon}`}  />
      }));
    })

    setState(null);
  }

  const createNewSubmit = (event) => {
    event.preventDefault();

    const ingrArray = ingredients.split('\n');
    const stepsArray = steps.split('\n');
    const fNames = Array.from(files).map( (file) => file.name );

    const data = {
      title: title,
      description: description,
      ingredients: ingrArray,
      steps: stepsArray,
      files: fNames,
      icon: fNames[0]
    }

    axios.post('http://localhost:3001/api/post/create-recipe', data)
      .then(res => {
        console.log(res);
        refresh();
      })

    console.log(data)

  }

  const createNewValueChange = (event) => {
    const target = event.target;
    if (target.id === "title") setTitle(target.value);
    else if (target.id === "desc") setDescription(target.value);
    else if (target.id === "ingr") setIngredients(target.value);
    else if (target.id === "steps") setSteps(target.value);
    else if (target.id === "files") setFiles(target.files);
  }

  const createNew = () => {
    return (
      <div className = "new-element">
        <h1>Create New Recipe</h1>
        <form className = "form" onSubmit = {createNewSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Title" id="title" onChange={createNewValueChange}/>
  
          <label htmlFor="desc">Description</label>
          <textarea placeholder="Description" id="desc" onChange={createNewValueChange}></textarea>
  
          <label htmlFor="ingr">Ingredients - Separated By New Line</label>
          <textarea placeholder="Ingredients" id="ingr" onChange={createNewValueChange}></textarea>
  
          <label htmlFor="steps">Steps  - Separated By New Line</label>
          <textarea placeholder="Steps" id="steps" onChange={createNewValueChange}></textarea>
  
          <label htmlFor="files">Images</label>
          <input type="file" id="files" multiple onChange={createNewValueChange}/>
  
          <input type="submit" value="Create New"/>
        </form>
        <div className = "close" onClick={() => setState(null)}>X</div>
      </div>
    );
  }

  const editSelected = (id) => {
    console.log('Edit: ' + id);
    return (
      <div className = "edit-element">
        <h1>Edit Selected Recipe</h1>
        <form>
          <input type="text" id="title" placeholder="title"></input>
  
        </form>
        <textarea id="description"></textarea>
  
        <div className = "close" onClick={() => setState(null)}>X</div>
      </div>)
  }

  const deleteSelected = async (id) => {
    await axios.delete(`http://localhost:3001/api/delete/delete-recipe/${id}`)
      .then( (res) => refresh());
  }

  return (
  <div className="menu left">
    <div className="banner">
      Menu
    </div>
    <div className="elements">
      {elements}
    </div>
    <div className="controls">
      <div className="button refresh" onClick={() => refresh()}><img src="RefreshItem.svg" alt="refresh"/></div>
      <div className="button add" onClick={() => setState(1)}><img src="AddItem.svg" alt="add"/></div>
    </div>
    { state === 1 ? createNew() : null }
  </div>
  );
}

export default LeftMenu;