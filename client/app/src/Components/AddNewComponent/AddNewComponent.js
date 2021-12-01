import './AddNewComponent.css';
import axios from 'axios';

const AddNewComponent = (props) => {
  const handleSubmit = (event) => {

    const ingrArray = event.target.Ingredients.value.split('\n');
    const stepArray = event.target.Steps.value.split('\n');
    const fNames = Array.from(event.target.Files.files).map( (file) => file.name );

    const data = {
      title: event.target.Title.value,
      description: event.target.Description.value,
      ingredients: ingrArray,
      steps: stepArray,
      files: fNames,
      icon: fNames[0]
    }

    axios.post('http://localhost:3001/api/post/create-recipe', data)
      .then(res => {

      })
  }

  return (
    <>
      <form className="edit-component" onSubmit={handleSubmit}>
        <span className="text">Add New Recipe</span>
        <input 
          type="text" 
          name="Title" 
          placeholder="Title" 
          className="edit-form input"/>
        <textarea 
          name="Description" 
          placeholder="Description" 
          className="edit-form input"/>
        <textarea 
          type="text" 
          name="Ingredients" 
          placeholder="Ingredients" 
          className="edit-form input"/>
        <textarea 
          type="text" 
          name="Steps" 
          placeholder="Steps" 
          className="edit-form input"/>
        <input 
          type="file" 
          name="Files" 
          placeholder="Title" 
          className="edit-form input"
          multiple/>

        <input type="submit" value="Update" className="edit-form submit"></input>

        <input type="button" value="X" className="edit-form close-form" onClick={() => props.addingState(false)}></input>
      </form>
    </>
    )
}

export default AddNewComponent;