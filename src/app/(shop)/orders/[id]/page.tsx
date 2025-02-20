import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCarOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],

]

interface Props {
    params: {
        id: string;
    }
}

export default function OrdersPage({params}: Props){

    const{id} = params;

    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden #${id}`}/>

                {/* Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col mt-5">

                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold mb-5",
                                {
                                    'bg-red-500': false,
                                    'bg-green-700': true,
                                }
                            )
                        }>
                            <IoCarOutline size={30}/>
                            <span className="mx-2">Pagada</span>
                        </div>

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
                                        <p>$ {product.price} * 3</p>
                                        <p className="font-bold">Subtotal: $ {product.price} * 3</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Resumen de la orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7 text-black">

                        <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Galileo Aleman</p>
                            <p>Res. San Antonio</p>
                            <p>San Antonio de los Altos</p>
                            <p>Mun. Lo Salias</p>
                            <p>Edo. Miranda</p>
                            <p>SA 1201</p>
                            <p>+584121234567</p>
                        </div>

                        <div className="w-full h-0.5 rounded mb-10 bg-rose-500"/>

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
                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold mb-5",
                                    {
                                        'bg-red-500': false,
                                        'bg-green-700': true,
                                    }
                                )
                            }>
                                <IoCarOutline size={30}/>
                                <span className="mx-2">Pagada</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}