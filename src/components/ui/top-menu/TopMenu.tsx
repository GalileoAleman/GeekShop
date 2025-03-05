'use client';

import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store"
import Link from "next/link"
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"

export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu)

  return (
    <nav className="flex px-5 justify-between items-center w-full bg-[#141F27] text-white">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont} antialiased font-bold`}>Geek</span>
          <span className={titleFont.className}> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link 
          className={`${titleFont} m-2 p-2 rounded-md transition-all hover:bg-gray-700`} 
          href="/type/anime"
        >
          Animes
        </Link>
        <Link 
          className={`${titleFont} m-2 p-2 rounded-md transition-all hover:bg-gray-700`} 
          href="/type/comic"
        >
          Cómics
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-rose-500 text-white -right-2">5</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
        onClick={openSideMenu} 
        className={`${titleFont} m-2 p-2 rounded-md transition-all hover:bg-gray-700`} >
          Menú
        </button>
      </div>
    </nav>
  )
}
