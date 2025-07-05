import { ClipboardDocumentListIcon, HomeIcon, PencilSquareIcon, PlusCircleIcon, SunIcon, UserIcon } from '@heroicons/react/16/solid';
import logoBlack from '../../assets/logo-black-2.png';
import NavButtonSmall from './buttons/NavButtonSmall';
import NavButton from './buttons/NavButton';
import { Link, NavLink } from 'react-router';

function NavBar() {

  return (
    <nav className="flex justify-between bg-blue-100 shadow-lg border-b-2 p-2 sticky">
      <div className=' hidden sm:flex cursor-pointer'>
        <Link to="/" className='w-35 md:w-40 block'>
          <img src={logoBlack} alt="shopping-list-logo" className='object-contain'></img>
        </Link>
      </div>
      <div className='gap-5 items-center flex lg:hidden w-full justify-center'>
        <NavButtonSmall to="/" ><HomeIcon /></NavButtonSmall>
        <NavButtonSmall to="/shopping-lists" ><ClipboardDocumentListIcon /></NavButtonSmall>
        <NavButtonSmall to="/create-shopping-list" ><PencilSquareIcon /></NavButtonSmall>
        <NavButtonSmall to="/add-dish" ><PlusCircleIcon /></NavButtonSmall>
        <NavButtonSmall to='/profile' ><UserIcon /></NavButtonSmall>
      </div>
      <div className='gap-5 items-center hidden lg:flex w-full justify-center'>
        <NavButton to="/" >Home</NavButton>
        <NavButton to="/shopping-lists" >Show Lists</NavButton>
        <NavButton to="/create-shopping-list" >Create List</NavButton>
        <NavButton to="/add-dish" >Add Dish</NavButton>
        <NavButton to='/profile' >Profile</NavButton>
      </div>
      <div className='hidden items-center sm:flex'>
        <NavLink to="/login" className='h-12 bg-blue-300 rounded-full cursor-pointer shadow-lg hover:bg-blue-400 flex justify-center items-center px-5 text-blue-950 font-bold'>
          Login
        </NavLink>
        <div className='hidden lg:flex justify-center items-center'>
          <button className='h-9 w-16 bg-blue-300 m-5 rounded-full cursor-pointer shadow-lg hover:bg-blue-400 flex justify-start items-center'>
            <SunIcon className='h-6 w-6 m-3 text-yellow-300'></SunIcon>
          </button>
          <button className='h-8 w-12 bg-blue-300 rounded cursor-pointer shadow-lg hover:bg-blue-400 flex justify-center items-center'>
            en
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;