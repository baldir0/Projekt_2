import './EditElementComponent.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

const EditElementComponent = (props) => {

  const [Title, setTitle] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Ingredients, setIngredients] = useState(null);
  const [Steps, setSteps] = useState(null)
  const [Files, setFiles] = useState(null)
  
  const fetchElementData = (id) => {
    axios.get(`http://localhost:3001/api/get/recipes/${id}`)
      .then( res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setIngredients(res.data.ingredients);
        setSteps(res.data.steps);
        setFiles(res.data.images);
      })
      .catch( err => {
        console.error(err);
        props.editingState(false);
      })
  }

  useEffect(() => {
    fetchElementData(props.elementid);
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const ingrArray = event.target.Ingredients.value.split('\n');
    const stepArray = event.target.Steps.value.split('\n');
    const fNames = Array.from(event.target.Files.files).map( (file) => file.name );

    axios.post(`http://localhost:3001/api/post/update-recipe/${props.elementid}`, {
      title: event.target.Title.value,
      description: event.target.Description.value,
      ingredients: ingrArray,
      steps: stepArray,
      files: fNames,
      icon: fNames[0]
    });
    props.editingState(false);
  }

  return (
    <>
      <form className="edit-component" onSubmit={handleSubmit}>
        <span className="text">Edit Recipe</span>
        <input 
          type="text" 
          name="Title" 
          placeholder="Title" 
          className="edit-form input" 
          defaultValue={Title}/>
        <textarea 
          name="Description" 
          placeholder="Description" 
          className="edit-form input" 
          defaultValue={Description}/>
        <textarea 
          type="text" 
          name="Ingredients" 
          placeholder="Ingredients" 
          className="edit-form input"
          defaultValue={Ingredients!==null ? JSON.parse(Ingredients.split(',')).join('\n') : ""}/>
        <textarea 
          type="text" 
          name="Steps" 
          placeholder="Steps" 
          className="edit-form input"
          defaultValue={Steps!==null ? JSON.parse(Steps.split(',')).join('\n') : ""} />
        <input 
          type="file" 
          name="Files" 
          placeholder="Files" 
          className="edit-form input"
          multiple/>

        <input type="submit" value="Update" className="edit-form submit"></input>

        <input type="button" value="X" className="edit-form close-form" onClick={() => props.editingState(false)}></input>
      </form>
    </>
    )
}

export default EditElementComponent;