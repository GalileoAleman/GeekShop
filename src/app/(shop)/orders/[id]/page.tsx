import { getOrderById } from "@/actions/order/getOrderById";
import { OrderStatus, PayPalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function OrderPage({params}: Props){

    const{id} = await params;

    const { ok, order } = await getOrderById(id);

    if (!ok) {
      redirect("/");
    }
  
    const address = order!.OrderAddress;

    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden #${id.split("-").at(-1)}`}/>

                {/* Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col mt-5">

                        <OrderStatus isPaid={order?.isPaid ?? false}/>

                        {
                            order!.OrderProduct.map( item => (
                                <div key={item.product.slug} className="flex mb-5">
                                    <Image
                                        width={100}
                                        height={100}
                                        style={{
                                            width:'100px',
                                            height:'130px'
                                        }}
                                        src={`/geek-products/${item.product.ProductImage[0].url}`}
                                        alt={item.product.title}
                                        className="mr-5 rounded"
                                    />                             
                                    <div>
                                        <p>{item.product.title}</p>
                                        <p>$ {item.price} * {item.quantity}</p>
                                        <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Resumen de la orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7 text-black">

                        <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
                        <div className="mb-10">
                        <p className="text-xl">
                            {address!.firstName} {address!.lastName}
                            </p>
                            <p>{address!.address}</p>
                            <p>{address!.address2}</p>
                            <p>{address!.zipCode}</p>
                            <p>
                            {address!.city}, {address!.countryId}
                            </p>
                            <p>{address!.phone}</p>
                        </div>

                        <div className="w-full h-0.5 rounded mb-10 bg-rose-500"/>

                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">
                        <span>Numero de productos:</span>
                            <span className="text-right">
                                {order?.items === 1 ? "1 artículo" : `${order?.items} artículos`}
                            </span>

                            <span>Subtotal:</span>
                            <span className="text-right">{currencyFormat(order!.subTotal)}</span>

                            <span>Impuestos: (16%)</span>
                            <span className="text-right">{currencyFormat(order!.fee)}</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
                        </div>

                        <div className="mt-5 mb-2 w-full text-white">
                            {
                                order?.isPaid 
                                ? (
                                    <OrderStatus isPaid={order?.isPaid ?? false}/>

                                )
                                :(
                                    <PayPalButton amount={order!.total} orderId={order!.id}/>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
