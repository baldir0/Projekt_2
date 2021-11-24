import React, { useState, useEffect } from 'react';
import './TopMenu.css';
import login, {logout, validateSession} from '../login.js';
import getCookieValue from '../cookie.js';

const TopMenu = () => {
  // Sign In button - 0
  // Sign In form - 1
  // Logout button - 2
  const [loginBarState, setLoginBarState] = useState(0);
  const [loginBar, setLoginBar] = useState(null);
  const [formStatus, setFormStatus] = useState(false);

  const formSubmitControl = (event) => {
    setFormStatus(false);
    login(event);
    setLoginBarState(2);
  }

  const loginForm = (
    <div className="login-form">
      <form onSubmit={formSubmitControl}>
        <input type="text" name="username"></input>
        <input type="password" name="password"></input>
        <input type="submit" value="Login"></input>
        <input type="button" onClick={() => setFormStatus(false)} value="Cancel"></input>
      </form>
    </div>
    );

  const logoutButton = (
    <div className="option logout" onClick={() => {logout(); setLoginBarState(0)}}>
      LogOut
    </div>
    );

  const loginButton = (
    <div className="option login" onClick={() => setFormStatus(true)}>
      Sign In
    </div>)


  const loginBarLogic = async () => {
    const sessionid_v = await getCookieValue('sessionid');
    if (sessionid_v && sessionid_v !== 'undefined') {
      if (await validateSession(sessionid_v)) {
        setLoginBarState(2);
      } else {
        document.cookie = "sessionid=";
        setLoginBarState(0)
      }
    } else {
      formStatus ? setLoginBarState(1) : setLoginBarState(0);
    }
  }

  useEffect(() => {
    console.table({
      loginBarState: loginBarState,
      formStatus: formStatus,
      loginBar: loginBar
    })

    loginBarLogic();
    if (loginBarState === 0) setLoginBar(loginButton);
    else if (loginBarState === 1) setLoginBar(loginForm)
    else if (loginBarState === 2) setLoginBar(logoutButton)
    console.log(loginBarState);
  }, [loginBarState, formStatus])

  return (      
    <div className="menu top">
      <div className="title">
        <span>COOK BOOK</span>
      </div>
    <div className="options">
      { loginBar }
     </div>
    </div>
  )
}

export default TopMenu;
