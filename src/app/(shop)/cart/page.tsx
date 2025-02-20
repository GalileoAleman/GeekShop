import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],

]

export default function CartPage(){

    if(productsInCart.length < 1)
        redirect("/empty")

    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito"/>

                {/* Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link href="/" className="underline mb-5">
                            Continúa comprando
                        </Link>
                    
                        {
                            productsInCart.map( product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        width={100}
                                        height={100}
                                        style={{
                                            width:'100px',
                                            height:'130px'
                                        }}
                                        src={`/geek-products/${product.images[0]}`}
                                        alt={product.title}
                                        className="mr-5 rounded"
                                    />                             
                                    <div>
                                        <p>{product.title}</p>
                                        <p>{`$ ${product.price}`}</p>
                                        <QuantitySelector quantity={1} stock={product.inStock}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Resumen de la orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7 text-black h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">
                            <span>Numero de productos:</span>
                            <span className="text-right">3 articulos</span>

                            <span>Subtutal:</span>
                            <span className="text-right">10%</span>

                            <span>Impuestos:</span>
                            <span className="text-right">$ 100</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">$ 110</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            <Link href="/checkout/address" className="flex btn-primary justify-center">
                                Checkout
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}