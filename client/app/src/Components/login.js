import axios from "axios";
import getCookieValue from "../cookie.js";

const login = async (event) => {
  event.preventDefault();
  const loginData = {
    username: event.target.username.value,
    password: event.target.password.value
  }
  if (loginData.username && loginData.password) {
    return await axios.post(`http://localhost:3001/api/auth/login`, loginData)
       .then( (result) => {
         document.cookie = "sessionid=" + result.data;
         if (result.status === 200) return true
         else return false
       })
  }
}

const validateSession = (sessionId) => {
  return axios.get(`http://localhost:3001/api/auth/validate/${sessionId}`)
    .then( (result) => {
      if (result.status === 200) return true
      else return false
    })
}

const logout = () => {
  const sessionId = getCookieValue('sessionid')
  if (sessionId !== 'undefined') {
    document.cookie = "sessionid="
    return axios.delete(`http://localhost:3001/api/auth/logout/${sessionId}`)
    .then( (result) => {
      if (result.status === 200) return true;
      else return false;
    });
  }
}

const getUserPermissions = (sessionId) => {
  return axios.get(`http://localhost:3001/api/get/userPermissionLevel/${sessionId}`)
}

window.addEventListener('onbeforeunload', () => {
  const sessionid = getCookieValue('sessionid');
  if (sessionid && sessionid !== 'undefined') {
    axios.get(`http://localhost:3001/api/auth/logout/${sessionid}`)
      .then( (result) => {
        if (result.status === 200) return true;
        else return false;
      });
  }
})

export default login;
export {validateSession, logout, getUserPermissions};