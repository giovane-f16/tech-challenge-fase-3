"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        const searchIconMobile = document.getElementById("searchIconMobile");
        const searchForm = document.querySelector("form");
        const links = document.querySelectorAll("nav a");

        searchIconMobile?.addEventListener("click", () => {
            if (searchForm?.classList.contains("hidden")) {
                searchForm.classList.remove("hidden");
                links.forEach(link => link.classList.add("hidden"));
            } else {
                searchForm?.classList.add("hidden");
                links.forEach(link => link.classList.remove("hidden"));
            }
        })
    });

    return(
        <header className="w-full bg-gray-900 text-white p-4 flex items-center justify-between">
            <a href="/" className="hover:underline">Blogging</a>
            <nav className="flex gap-4 items-center">
                {session ? (
                    <div className="flex gap-4">
                        <span>Olá, Prof. {session.user?.name}!</span>
                        <a href="/posts/edit" className="hover:underline">Editar Posts</a>
                        <a href="/api/auth/signout" className="hover:underline">Deslogar</a>
                    </div>
                ) : (
                    <>
                    <a href="/login" className="hover:underline">Entrar</a>
                    <a href="/register" className="hover:underline">Cadastrar</a>
                    </>
                )}
                <form className="md:w-72 hidden md:block">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 hidden items-center ps-3 pointer-events-none md:flex">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-0 ps-3 md:p-4 md:ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Faça sua busca" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block cursor-pointer">Pesquisar</button>
                    </div>
                </form>
                <svg id="searchIconMobile" className="md:hidden w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </nav>
        </header>
    );
}

export default Header;