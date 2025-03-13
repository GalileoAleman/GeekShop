import { Title } from "@/components";
import Link from "next/link";
import { ProductsCartCheck } from "./ui/ProductsCartCheck";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage(){
    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title="Verificar orden"/>

                {/* Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Productos de la orden</span>
                        <Link href="/cart" className="underline mb-5">
                            Editar orden
                        </Link>
                    
                    <ProductsCartCheck/>
                    </div>

                    {/* Resumen de la orden */}
                    <PlaceOrder/>
                </div>
            </div>
        </div>
    )
}