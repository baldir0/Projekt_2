import axios from 'axios'
import { useState, useEffect } from 'react'
import './ContentComponent.css'

const ContentComponent = (props) => {

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
        const parseImage = JSON.parse(res.data.images||"[]")
        const Images = parseImage.map( (item, pos) => {
          return <img src={`http://localhost:3001/api/get/image/${item}`} alt={item} className={ pos === 0 ? "content-image active" : "content-image" } key={"img" + pos}/>
        })
        setFiles(Images);
      })
      .catch( err => {
        console.error(err);
      })
  }

  useEffect(() => {
    fetchElementData(props.loadedElement)
  }, [props.loadedElement]);

  return (
    <div className="box">
    <span className="recipe title text">{Title}</span>
    <div className="recipe image">
      <div className="arrow left" onClick={() => prevPage()}><span>{'<'}</span></div>
        <div className="images">{Files}</div>
      <div className="arrow right" onClick={() => nextPage()}><span>{'>'}</span></div>
    </div>
    <div className="recipe description text">
      <h2>Description</h2>
        {Description}
    </div>
    <div className="recipe ingredients text">
      <h2>Ingredients</h2>
        {(JSON.parse(Ingredients)!==null) ? JSON.parse(Ingredients).map(item => <li key={item}>{item}</li>) : ""}
    </div>
    <div className="recipe steps text">
      <h2>Steps</h2>  
    </div>
  </div>
  )
}

export default ContentComponent;

const prevPage = () => {
  const images = Array.from(document.querySelectorAll('.content-image'))

  let activeImagePosition;
  images.map( (img, pos) => {
    if (img.className === 'content-image active') {
      activeImagePosition = pos;
      img.className = 'content-image';
      return true;
    }
    return false;
  });

  activeImagePosition > 0 ? images[activeImagePosition-1].className = 'content-image active' : images[images.length-1].className = 'content-image active';
}

const nextPage = () => {
  const images = Array.from(document.querySelectorAll('.content-image'))

  let activeImagePosition;
  images.map( (img, pos) => {
    if (img.className === 'content-image active') {
      activeImagePosition = pos;
      img.className = 'content-image';
      return true;
    }
    return false;
  });

  activeImagePosition < images.length-1 ? images[activeImagePosition+1].className = 'content-image active' : images[0].className = 'content-image active';
}