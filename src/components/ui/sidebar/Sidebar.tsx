'use client';

import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { useUIStore } from '@/store'
import clsx from "clsx"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
    const router = useRouter();
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const [searchTerm, setSearchTerm] = useState('');

    const {data: session} = useSession();
    const isLogin = !!session?.user;
    const isAdmin = (session?.user.role === "admin");

    const handleLogout = async () => {
        await signOut({ redirect: false });
        closeMenu();
        router.refresh();
    };

    //Maneja la busqueda de productos
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchTerm.trim();
            if (query.length === 0) return;

            closeMenu(); // cierra el menu lateral
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div>
            {/* Fondo transparente  */}
            {
                isSideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"/>
                )
            }
            {
                isSideMenuOpen && (
                    <div
                    onClick={closeMenu}  
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"/>
                )
            }

            {/* Side Menu */}
            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen z-20 shadow-2xl transform transition-all duration-300 bg-custom-bg",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )
            }>

                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={()=> closeMenu()}
                />


                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" color="#141F27" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                        className="text-black w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-rose-500"
                    />
                </div>

                {/* Menu */}
                {
                    isLogin && (
                        <>
                            <Link
                                href={"/profile"}
                                onClick={closeMenu}  
                                className="flex items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                    <IoPersonOutline size={30} className="ml-3 text-xl"/>
                                    <span className="ml-3 text-xl">Perfil</span>
                            </Link>

                            <Link
                                href={"/orders"}
                                onClick={closeMenu}  
                                className="flex items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                    <IoTicketOutline size={30} className="ml-3 text-xl"/>
                                    <span className="ml-3 text-xl">Ordenes</span>
                            </Link>
                        </>
                    )
                }

                {
                    isLogin && (
                        <button
                            onClick={() => 
                                handleLogout()
                            }
                            className="flex w-full items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                <IoLogOutOutline size={30} className="ml-3 text-xl"/>
                                <span className="ml-3 text-xl">Salir</span>
                        </button>
                    )
                }

                {
                    !isLogin && (
                        <Link
                            href={"/auth/login"}
                            onClick={closeMenu}  
                            className="flex items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                <IoLogInOutline size={30} className="ml-3 text-xl"/>
                                <span className="ml-3 text-xl">Ingresar</span>
                        </Link>
                    )
                }

                {
                    isAdmin && (
                        <>
                            {/* Separador */}
                            <div className="w-full h-px bg-gray-300 my-10"/>

                            {/* Admin */}
                            <Link
                                href={"/admin/products"}
                                onClick={closeMenu}  
                                className="flex items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                    <IoShirtOutline size={30} className="ml-3 text-xl"/>
                                    <span className="ml-3 text-xl">Productos</span>
                            </Link>

                            <Link
                                href={"/admin/orders"}
                                onClick={closeMenu}  
                                className="flex items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                    <IoTicketOutline size={30} className="ml-3 text-xl"/>
                                    <span className="ml-3 text-xl">Ordenes</span>
                            </Link>

                            <Link
                                href={"/admin/users"}
                                onClick={closeMenu}  
                                className="flex items-center mt-10 p-2 hover:bg-gray-700 rounded transition-all">
                                    <IoPeopleOutline size={30} className="ml-3 text-xl"/>
                                    <span className="ml-3 text-xl">Usuarios</span>
                            </Link>
                        </>
                    )
                }
            </nav>
        </div>
    )
}
