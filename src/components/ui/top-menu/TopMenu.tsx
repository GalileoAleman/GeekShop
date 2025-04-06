'use client';

import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"

export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu)
  const totalItemsCart = useCartStore(state => state.getTotalItems())

  const[loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  
  return (
    <nav className="flex px-5 justify-between items-center w-full bg-[#141F27] text-white">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
      <Image className="rounded-full"
        src="/imgs/favicon-png.png"
        alt="Geek Shop Icon"
        width={30}
        height={30}/>
        
        <div className="flex items-center">
          <span className={`${titleFont} antialiased font-bold`}>Geek</span>
          <span className={titleFont.className}> | Shop</span>
        </div>
      </Link>

      {/* Center Menu */}
      <div className="sm:block">
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

        <Link href={
          (totalItemsCart === 0 && loaded) ?
          "/empty" :
          "/cart"
          } className="mx-2">
          <div className="relative">
            {
              (loaded && totalItemsCart > 0) && (
                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 bg-rose-500 text-white -right-2">
                 {totalItemsCart}
                </span>
              )
            }
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
