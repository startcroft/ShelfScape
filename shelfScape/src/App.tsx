import './App.scss';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const navigate = useNavigate();

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigate("/Login")
  }
  return (
    <>
      <div className='home'>
       <section className='home__section'>
        <img className='home__section--img' src="src\assets\biblioteca.jpg" alt="library" />
        <h1 className='home__section--h1'>SHELFSCAPE</h1>
        <p className='home__section--p'>where you can store all your information in a more organized way.</p>
        <div className='containerButton'>
          <button onClick={handleLogin} className='containerButton__button'>Login</button>
          <button className='containerButton__button'>Sign in</button>
        </div>
        </section>
      </div>
    </>
  )
}

export default App
