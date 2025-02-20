import { titleFont } from "@/config/fonts"
import Link from "next/link"


export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
        <Link href="/">
            <span className={`${titleFont} antialiased font-bold`}>Geek</span>
            <span className={titleFont.className}> | Shop </span>
            <span>© {new Date().getFullYear()}</span>
        </Link>
    </div>
  )
}
