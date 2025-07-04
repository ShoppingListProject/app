import NavBar from './components/NavBar';

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <main className="flex flex-col sm:flex-row grow mb-40 justify-center items-center h-full gap-20">    
        <button className="font-bold shadow-lg w-50 h-30 bg-blue-300 rounded-full hover:bg-blue-400 cursor-pointer">
          Show Shopping Lists
        </button>  
        <button className="font-bold shadow-lg w-50 h-30 bg-blue-300 rounded-full hover:bg-blue-400 cursor-pointer">
          Generate Shopping List
        </button>
        <button className="font-bold shadow-lg w-50 h-30 bg-blue-300 rounded-full hover:bg-blue-400 cursor-pointer">
          Add New Dish
        </button>
      </main>
    </div>
  )
}

export default App
