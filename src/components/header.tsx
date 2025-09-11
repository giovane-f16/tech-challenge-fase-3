const Header = () => {
    return(
        <header className="w-full bg-gray-900 text-white p-4 flex items-center justify-between">
            Olá sou um header
            <nav className="flex gap-4">
                <a href="#" className="hover:underline">Posts</a>
                <a href="#" className="hover:underline">Sobre</a>
                <a href="#" className="hover:underline">Contato</a>
            </nav>
        </header>
    )
}

export default Header;