const Navbar = () => {
    return (
        <nav className="flex bg-purple-700 items-center h-[8vh] justify-between w-full px-16 max-md:justify-evenly max-md:p-0 max-md:gap-2">

            <div className="head flex items-center">
                <img className="w-14 mx-4 rounded-full cursor-pointer brightness-150 hover:brightness-125 max-md:w-9 max-md:p-0" src="/public/favicon.jpeg" alt="" />
                <span className="text-red-600 font-bold text-2xl cursor-pointer max-md:text-xl">&lt;</span>
                <span className="text-2xl font-bold text-gray-900 cursor-pointer max-md:text-xl">iPassword</span>
                <span className="text-red-600 font-bold text-2xl cursor-pointer max-md:text-xl">Manager /&gt;</span>
            </div>

            <button className="bg-violet-800 rounded-2xl ring-white ring-1 p-[7px] hover:bg-violet-900 hover:ring-gray-400 max-md:gap-2 max-md:p-2">
                <a className="flex items-center gap-3 " href="https://github.com/hetchawda007" target="_blank">
                    <img className="w-8 invert cursor-pointer max-md:w-5 " src="/public/github.png" alt="Github login" />
                    <div className="text-white font-semibold max-md:hidden">GitHub</div>
                </a>
            </button>
        </nav>
    )
}

export default Navbar
