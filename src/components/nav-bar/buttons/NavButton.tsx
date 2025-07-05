import { NavLink } from "react-router";

interface NavButtonProps {
    children?: React.ReactNode;
    to: string;
}

function NavButton({children, to}: NavButtonProps) {
    return (<NavLink to={to} className='flex-1 max-w-max h-12 bg-blue-300 hover:bg-blue-400 rounded p-3 cursor-pointer shadow-lg'>
        {children}
    </NavLink>)
}

export default NavButton;