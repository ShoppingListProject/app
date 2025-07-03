import logoBlack from './assets/logo-black.png';

function App() {

  

  return (
    <div className="min-h-screen flex flex-col items-center flex-wrap">
     <nav className="flex items-center flex-none">
      <img src={logoBlack} alt="shopping list logo" className='w-50'></img>
     </nav>
      <main className="flex flex-col sm:flex-row grow mb-40 justify-center items-center h-full gap-20">      
        <button className="size-50 bg-blue-800 text-white rounded hover:bg-blue-900 cursor-pointer">
          Generate Shopping List
        </button>
        <button className="size-50 bg-blue-800 text-white rounded hover:bg-blue-900 cursor-pointer">
          Add New Dish
        </button>
      </main>
    </div>
  )
}

export default App
