'use client'

import { ProductImg, QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProductsCart = () => {

    const productsInCart = useCartStore(state => state.cart)
    const[loaded, setLoaded] = useState(false);
    const upProductQuantity = useCartStore(state => state.updateProductQuantity)
    const delProduct = useCartStore(state => state.removeProduct)

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
                        <ProductImg
                            width={100}
                            height={100}
                            style={{
                                width:'100px',
                                height:'130px'
                        }}
                        src={product.image}
                        alt={product.title}
                        className="mr-5 rounded"
                    />                             
                    <div>
                        <Link
                        className="hover:underline cursor-pointer"
                         href={`/product/${product.slug}`}>
                            <p>{product.title}</p>
                        </Link>
                        <p>{`$ ${product.price}`}</p>
                        <QuantitySelector 
                            quantity={product.quantity} 
                            stock={product.stock} 
                            onQuantityChanged={quantity => upProductQuantity(product, quantity)}/>

                        <button
                            onClick={() => delProduct(product)}
                            className="underline mt-3">
                                Remover
                        </button>
                    </div>
                </div>
            ))
        }
    </>
    )
}
