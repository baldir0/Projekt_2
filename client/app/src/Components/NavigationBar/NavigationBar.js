import './NavigationBar.css';

const NavigationBar = ((props) => {
  const handleClick = ( () => {
    props.loginState(true);
  })

  return (
    <nav className="navbar">
      <span className='text'>COOKING BOOK</span>
      <button className='button login' onClick={handleClick}> Sign In </button>
    </nav>
  )
});

export default NavigationBar;
