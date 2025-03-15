'use server';

import { auth } from "@/auth.config";
import { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductOrder {
  productId: string;
  quantity: number;
}

export const placeOrder = async (productIds: ProductOrder[], address: Address) => {
    const session = await auth();
    const userId = session?.user.id;

    //Se Verifica la sesion del usuario
    if (!userId) {
    return {
        ok: false,
        message: "No hay sesión de usuario",
    };
    }

    //Obtener la información de los productos
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map((p) => p.productId),
            },
        },
    });

    //Se Calcula la cantidad de productos en la orden
    const itemsOrder = productIds.reduce((count, prod) => count + prod.quantity, 0);

    //Se calcula los totales del fee, subtotal, y total
    const {subTotal, fee, total} = productIds.reduce(
        (totals, item) => {
            //Cantidad
            const productQuantity = item.quantity;
            //Saco los productos
            const product = products.find((product) => product.id === item.productId);

            if (!product)
                 throw new Error(`${item.productId} no existe - 500`);

            const subTotal = product.price * productQuantity;

            //Seco los detalles de la orden
            totals.subTotal += subTotal;
            totals.fee += subTotal * 0.16;
            totals.total += subTotal * 1.16;

            return totals
            
    }, {subTotal: 0, fee: 0, total: 0});

    //Se crea la transacción de la base de datos
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            //Se Actualiza el stock de los productos
            const updatedProductsPromises = products.map((product) => {
                //Acumular los valores
                const productQuantity = productIds
                    .filter((p) => p.productId === product.id)
                    .reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene la cantidad definida`);
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                    // inStock: product.inStock - productQuantity // no hacer
                    inStock: {
                        decrement: productQuantity,
                    },
                    },
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            //Verificar valores negativos en las existencia = no hay stock
            updatedProducts.forEach((product) => {
            if (product.inStock < 0) {
                throw new Error(`${product.title} no tiene inventario suficiente`);
            }
            });

            //Se Crea la orden - Detalles
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    items: itemsOrder,
                    subTotal: subTotal,
                    fee: fee,
                    total: total,

                    OrderProduct: {
                        createMany: {
                            data: productIds.map((p) => ({
                            quantity: p.quantity,
                            productId: p.productId,
                            price:
                                products.find((product) => product.id === p.productId)?.price ?? 0,
                            })),
                        },
                    },
                },
            });

            //Se crea la direccion de la orden
            const { country, userId: _, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id,
                },
            });

            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            };
        });


        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error?.message,
        };
    }
};