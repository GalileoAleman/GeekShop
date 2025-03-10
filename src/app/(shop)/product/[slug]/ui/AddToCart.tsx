'use client';

import { QuantitySelector, StockLabel } from "@/components";
import { CartProduct, Product } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({product}: Props) => {
  
  const [quantity, setQuantity] = useState<number>(1);
  const addProductToCart = useCartStore( state => state.addProductTocart );

  const addToCart = () => {

    //Cargo el producto del base de datos a agregado por el usuario
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      stock: product.inStock
    }

    addProductToCart(cartProduct);
    setQuantity(1);
  };

  return (
    <>
        <StockLabel slug={product.slug}/>
        <QuantitySelector quantity={quantity} stock={product.inStock} onQuantityChanged={setQuantity}/>

        <button onClick={addToCart} className="btn-primary my-5">
            Agregar al carrito
        </button>
    </>
  )
}
