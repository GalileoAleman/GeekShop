'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const OrderSummary = () => {

    const router = useRouter();
    const[loaded, setLoaded] = useState(false);
    const cart = useCartStore(state => state.cart);

    // Calculamos el resumen de forma memoizada
    const summary = useMemo(() => {
        const subTotal = cart.reduce((acc, product) => acc + product.quantity * product.price, 0);
        const fee = subTotal * 0.15;
        const total = subTotal + fee;
        const itemsCart = cart.reduce((acc, product) => acc + product.quantity, 0);
        return { subTotal, fee, total, itemsCart };
    }, [cart]);

  const {itemsCart, subTotal, fee, total} = summary;

    useEffect(() => {
        setLoaded(true);
    }, [])

    useEffect(() => {

        if ( itemsCart === 0 && loaded === true )   {
            router.replace('/empty')
        }
      })

    if(!loaded){
        return <p>Cargando...</p>
    }

    return (
        <>
            <div className="grid grid-cols-2">
                <span>Numero de productos:</span>
                <span className="text-right">
                    {itemsCart === 1 ? "1 artículo" : `${itemsCart} artículos`}
                </span>

                <span>Subtotal:</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos: (16%)</span>
                <span className="text-right">{currencyFormat(fee)}</span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
            </div>
        </>
    )
}
