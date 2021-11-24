const getCookieValue = (name) => {
  const cookies = document.cookie.split(';');
  for (let i = 0 ; i < cookies.length; i++) {
    const c = cookies[i].trim().split('=');
    if (c[0] === name) return c[1];
  }
  return undefined;
}

export default getCookieValue;