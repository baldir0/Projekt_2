import React from 'react';
import './LoginComponent.css';


const LoginComponent = ((props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginState(false);

    const login_data = {
      login: event.target.login.value,
      password: event.target.password.value
    }

    console.log(login_data);
  }

  return (
    <>
      <form className="login-component" onSubmit={handleSubmit}>
        <span className="text">Sign In</span>
        <input 
          type="text" 
          name="login" 
          placeholder="Login" 
          className="login-form input" />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="login-form input" />
        <input type="submit" value="Sign In" className="login-form submit"></input>

        <input type="button" value="X" className="login-form close-form" onClick={() => {props.loginState(false)}}></input>
      </form>
    </>
    )
})

export default LoginComponent;