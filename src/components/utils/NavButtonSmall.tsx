function NavButtonSmall({children}: {children?: React.ReactNode}) {
    return (<button className='h-11 w-11 bg-blue-300 hover:bg-blue-400 rounded p-2 cursor-pointer shadow-lg'>
        {children}
    </button>)
}

export default NavButtonSmall;