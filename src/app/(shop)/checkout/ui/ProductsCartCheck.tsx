'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

export const ProductsCartCheck = () => {

    const productsInCart = useCartStore(state => state.cart)
    const[loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if(!loaded){
        return <p>Cargando...</p>
    }

    return (
    <>
        {
            productsInCart.map( product => (
                <div key={`${product.slug}-${product.id}`} className="flex mb-5">
                        <Image
                            width={100}
                            height={100}
                            style={{
                                width:'100px',
                                height:'130px'
                        }}
                        src={`/geek-products/${product.image}`}
                        alt={product.title}
                        className="mr-5 rounded"
                    />                             
                    <div>
                        <span>{product.title} - ({product.quantity})</span>
                        <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
                    </div>
                </div>
            ))
        }
    </>
    )
}
