'use client'

import { genPagNums } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props{
    totalPages: number;
}


export const Pagination = ({totalPages}: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN( +pageString ) ? 1 : +pageString;
  
    if (currentPage < 1 || isNaN(+pageString) ) {
        redirect( pathName );
    }
   
    const allPages = genPagNums(currentPage, totalPages);
  
    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)

        if(pageNumber === "...")
            return `${pathName}?${params.toString()}`;

        if(+pageNumber <= 0)
            return `${pathName}`;

        if(+pageNumber > totalPages)
            return `${pathName}?${params.toString()}`;

        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    }
  
    return (
    <div className="flex text-center justify-center mt-20 mb-32">
    <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
        <li className="page-item"><Link
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-300 hover:text-gray-200 hover:bg-gray-700 focus:shadow-none"
            href={createPageUrl(currentPage - 1)}><IoChevronBackOutline size={30}/></Link></li>
            
            {
              allPages.map( (page) => (

                <li key={ page } className="page-item">
                  <Link
                    className={
                      clsx(
                        "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-300 hover:text-gray-200 hover:bg-gray-700 focus:shadow-none",
                        {
                          'bg-rose-600 shadow-sm text-white hover:text-white hover:bg-rose-700': page === currentPage
                        }
                      )
                    }
                    href={ createPageUrl( page ) }
                  >
                    { page }
                  </Link>
                </li>
              ))
          }
            
        <li className="page-item"><Link
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-300 hover:text-gray-200 hover:bg-gray-700 focus:shadow-none"
            href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline size={30}/></Link></li>
        </ul>
    </nav>
    </div>
    )
}
