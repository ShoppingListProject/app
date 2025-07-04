import NavBar from './components/nav-bar/NavBar';

function App() {

  return (
    <div className="min-h-screen flex flex-col backdrop-blur-md">
      <NavBar/>
      <main className='flex flex-col items-start justify-center p-5 sm:p-20 lg:pr-40 lg:pl-40'>
        <div>
          <h1 className='text-4xl md:text-6xl'>Plan <span className='text-blue-900 text-5xl md:text-7xl'>Dishes</span> &</h1>    
          <h1 className='text-4xl md:text-6xl'>Get Your <span className='text-blue-900 text-5xl md:text-7xl'>Shopping List</span></h1>    
          <div className='h-5 mt-5 mb-5 bg-blue-950 rounded-full'></div>
          <span className='text-xl'>Create your perfect shopping list by selecting dishes from the catalog or adding your own. Each dish includes its ingredients, and once selected, a categorized shopping list is generated automatically. Easily manage, save, or copy your list — shopping made simple.</span>
        </div>
        <div className='flex flex-row w-full justify-center mt-10'>
          <button className="font-bold shadow-lg w-50 h-30 bg-blue-300 rounded-full hover:bg-blue-400 border-3 border-blue-950 cursor-pointer">
            Generate Shopping List
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
