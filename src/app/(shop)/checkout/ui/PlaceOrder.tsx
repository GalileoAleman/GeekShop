'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const address = useAddressStore((state) => state.address);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart);

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
        }, []);

    if (!loaded) {
    return <p>Cargando...</p>;
    }

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
    
        const productsOrder = cart.map( product => ({
          productId: product.id,
          quantity: product.quantity,
        }))
    
    
        //! Server Action
        const resp = await placeOrder(productsOrder, address);

        if (!resp.ok) {
          setIsPlacingOrder(false);
          setErrorMessage(resp.message);
          return;
        }
    
        //La transaccion salio bien
        clearCart();
        router.replace('/orders/' + resp.order?.id);
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7 text-black">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
                <p className="text-xl">
                {address.firstName} {address.lastName}
                </p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.zipCode}</p>
                <p>
                {address.city}, {address.country}
                </p>
                <p>{address.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded mb-10 bg-rose-500"/>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

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

            <p className="mb-5">
                <span className="text-xs">
                    Al hacer click en &quot;Completar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones.</a>
                </span>
            </p>

            <p className="text-red-500">{ errorMessage }</p>

            <div className="mt-5 mb-2 w-full">
                <button
                onClick={ onPlaceOrder }
                className={
                    clsx({
                        'btn-primary': !isPlacingOrder,
                        'btn-disabled': isPlacingOrder
                    })}>
                    Colocar orden
                </button>
            </div>
        </div>
    )
}
