function NavButton({children}: {children?: React.ReactNode}) {
    return (<button className='flex-1 max-w-max h-12 bg-blue-300 hover:bg-blue-400 rounded p-3 cursor-pointer shadow-lg'>
        {children}
    </button>)
}

export default NavButton;