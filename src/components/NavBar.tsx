import { ClipboardDocumentListIcon, Cog6ToothIcon, HomeIcon, PencilSquareIcon, PlusCircleIcon, SunIcon } from '@heroicons/react/16/solid';
import logoBlack from '../assets/logo-black-2.png';
import NavButtonSmall from './utils/NavButtonSmall';
import NavButton from './utils/NavButton';

function NavBar() {

    return (
    <nav className="flex justify-between bg-blue-100 shadow-lg border-b-2 p-2 ">
      <div className=' hidden sm:flex cursor-pointer'>
        <button className='w-35 md:w-40'>
          <img src={logoBlack} alt="shopping-list-logo" className='object-contain'></img>
        </button>
      </div>
      <div className='gap-5 items-center flex lg:hidden w-full justify-center'>
        <NavButtonSmall><HomeIcon/></NavButtonSmall>
        <NavButtonSmall><ClipboardDocumentListIcon/></NavButtonSmall>
        <NavButtonSmall><PencilSquareIcon/></NavButtonSmall>
        <NavButtonSmall><PlusCircleIcon/></NavButtonSmall>
        <NavButtonSmall><Cog6ToothIcon/></NavButtonSmall>
      </div>
      <div className='gap-5 items-center hidden lg:flex w-full justify-center'>
        <NavButton>Home</NavButton>
        <NavButton>Show Lists</NavButton>
        <NavButton>Create List</NavButton>
        <NavButton>Add Dish</NavButton>
        <NavButton>Settings</NavButton>
      </div>
      <div className='hidden items-center sm:flex'>
        <button className='h-11 w-22 bg-blue-300 m-5 rounded-full cursor-pointer shadow-lg hover:bg-blue-400 flex justify-start items-center'>
            <SunIcon className='h-8 w-8 m-3 text-yellow-300'></SunIcon>
        </button>
        <button className='h-10 w-15 bg-blue-300 rounded cursor-pointer shadow-lg hover:bg-blue-400 flex justify-center items-center'>
          en
        </button>
      </div>
     </nav>
    )
}

export default NavBar;