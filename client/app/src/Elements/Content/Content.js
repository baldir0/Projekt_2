import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';

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

const Content = (props) => {

  const [content, setContent] = useState(<div>Select Recipe From Menu to Load</div>);

  useEffect( () => {
    if (props.loadedElement !== null) {
      
    axios.get(`http://localhost:3001/api/get/recipes/${props.loadedElement}`)
    .then( (res) => {
      if (res.status !== 200) {
        return setContent(<div classname="error">Recipe Loading Failed</div>);
      }
      if (res.data === '') {
        return;
      }

      setContent(<div className="loading">Loading Recipe...</div>);

      const Title = <h1>{res.data.title}</h1>; 
      const Description = <p>{res.data.description}</p>; 
      const Ingredients = <ol>{JSON.parse(res.data.ingredients).map((item) => <li key={item}>{item}</li>)}</ol>;
      const Steps = <ol>{JSON.parse(res.data.steps).map((item) => <li key={item}>{item}</li>)}</ol>;

      const Images = JSON.parse(res.data.images).map( (item, pos) => {
        return <img src={`http://localhost:3001/api/get/image/${item}`} alt={item} className={ pos === 0 ? "content-image active" : "content-image" } key={"img" + pos}/>
      })

      setContent(
        <div className="box">
          <div className="recipe title">{Title}</div>
          <div className="recipe image">
            <div className="arrow left" onClick={() => prevPage()}><span>{'<'}</span></div>
              <div className="images">{Images}</div>
            <div className="arrow right" onClick={() => nextPage()}><span>{'>'}</span></div>
          </div>
          <div className="recipe description">
            <h2>Description</h2>
              {Description}
          </div>
          <div className="recipe ingredients">
            <h2>Ingredients</h2>
            <ol>
              {Ingredients}
            </ol>
          </div>
          <div className="recipe steps">
            <h2>Steps</h2>
            {Steps}
          </div>
        </div>
      )
    })
    }
  }, [props]);

  return (
    <div className="content">
      {content}
    </div>
  )
    // axios.get(`http://localhost:3001/api/get/recipes/${props.loadedElement}`)
    //   .then((res) => {
    //     // setTitle(res.data.title);
    //     // setDescription(res.data.description);
    //     // const ing = JSON.parse(res.data.ingredients);
    //     // setIngredients(ing.map((i) => {
    //     //   return <li>{i}</li>
    //     // }))
    //     // console.log();
    //     // setIngredients(JSON.parse(res.data.ingredients));
    //   })
    // return (
    //   <div className="content">
    //     <div className="box">
    //       <div className="recipe title">
    //         {title}
    //       </div>
    //       <div className="recipe image">
    //         <div className="arrow left"><span>{'<'}</span></div>
    //         {images}
    //         <div className="arrow right"><span>{'>'}</span></div>
    //       </div>
    //       <div className="recipe description">
    //         <h2>Description</h2>
    //         {description}
    //         </div>
    //       <div className="recipe ingredients">
    //         <h2>Ingredients</h2>
    //         <ol>
    //           {ingredients}
    //         </ol>
    //       </div>
    //       <div className="recipe steps">
    //         <h2>Steps</h2>
    //         {steps}
    //       </div>
    //     </div>
    //   </div>
    // )
}

export default Content;