import Main from './components/Main';
import NavBar from './components/nav-bar/NavBar';

function App() {

  return (
    <div className="min-h-screen flex flex-col backdrop-blur-sm">
      <NavBar/>
      <Main/>
    </div>
  )
}

export default App
