import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'

export const roboto = Roboto({
    weight: ['500', '700'],
    subsets: ['latin'],
  })
  
export const inter = Inter({ subsets: ['latin'] })

export const titleFont = inter