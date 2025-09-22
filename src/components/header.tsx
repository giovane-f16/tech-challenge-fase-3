import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Header = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSearch = () => {
        const searchForm = document.querySelector("form");
        const links = document.querySelectorAll("nav a");
        const button = document.querySelector("nav div button");

        if (searchForm?.classList.contains("hidden")) {
            searchForm.classList.remove("hidden");
            links.forEach(link => link.classList.add("hidden"));
            button?.classList.add("hidden");
        } else {
            searchForm?.classList.add("hidden");
            links.forEach(link => link.classList.remove("hidden"));
            button?.classList.remove("hidden");
        }
    }

    const handleLogout = () => {
        if (!confirm("Deseja realmente sair?")) {
            return;
        }

        signOut({ callbackUrl: "/" });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search") as string;

        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    }

    return(
        <header className="w-full bg-gray-900 text-white p-4 flex items-center justify-between">
            <a href="/" className="hover:underline">Blogging</a>
            <nav className="flex gap-4 items-center">
                {session ? (
                    <div className="flex gap-4 items-center">
                        <span className="hidden md:block">Olá, Prof. {session.user?.name}!</span>
                        <a href="/posts/edit" className="bg-green-500 px-4 py-2 rounded cursor-pointer hover:bg-green-600">Editar Posts</a>
                        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
                            Sair
                        </button>
                    </div>
                ) : (
                    <>
                    <a href="/login" className="py-2 hover:underline">Entrar</a>
                    <a href="/register" className="py-2 hover:underline">Cadastrar</a>
                    </>
                )}
                <form className="md:w-72 hidden md:block" onSubmit={handleSubmit}>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 hidden items-center ps-3 pointer-events-none md:flex">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" name="search" id="search" className="block w-full px-4 py-2 md:p-4 md:ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Faça sua busca" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block cursor-pointer">Pesquisar</button>
                    </div>
                </form>
                <svg id="searchIconMobile" onClick={handleSearch} className="md:hidden w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </nav>
        </header>
    );
}

export default Header;