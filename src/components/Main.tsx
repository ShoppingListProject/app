function Main() {
  return (
      <main className='flex flex-col items-start justify-center p-5 sm:p-20 lg:pr-40 lg:pl-40'>
        <div>
          <h1 className='text-4xl md:text-6xl'>Plan <span className='text-blue-900 text-5xl md:text-7xl'>Dishes</span> &</h1>    
          <h1 className='text-4xl md:text-6xl'>Get Your <span className='text-blue-900 text-5xl md:text-7xl'>Shopping List</span></h1>    
          <div className='h-2 mt-5 mb-5 bg-blue-950 rounded-full'></div>
          <span className='text-xl'>Create your perfect shopping list by selecting dishes from the catalog or adding your own. Each dish includes its ingredients, and once selected, a categorized shopping list is generated automatically. Easily manage, save, or copy your list — shopping made simple.</span>
        </div>
        <div className='mt-10 block flex justify-center items-center w-full md:block'>
          <button className="font-bold shadow-lg w-40 h-20 md:w-60 md:h-30 bg-blue-300 rounded-lg hover:bg-blue-400 border-3 border-blue-950 cursor-pointer">
            Create Shopping List
          </button>
        </div>
      </main>
  );
}

export default Main;