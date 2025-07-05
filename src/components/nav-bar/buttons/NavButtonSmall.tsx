import { NavLink } from "react-router";

interface NavButtonSmallProps {
    children?: React.ReactNode;
    to: string;
}

function NavButtonSmall({children, to}: NavButtonSmallProps) {

    return (
        <NavLink to={to} className='h-11 w-11 bg-blue-300 hover:bg-blue-400 rounded p-2 cursor-pointer shadow-lg'>
            {children}
        </NavLink>
    )
}

export default NavButtonSmall;