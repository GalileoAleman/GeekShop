'use server';

import { prisma } from "@/lib/prisma";
import { Type } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    type?: Type;
}

export const getPagProductWithImg = async({page = 1, take = 6, type} : PaginationOptions) => {

    if(isNaN(Number(page)))
        page = 1;

    if(page < 1)
        page = 1;

    if(isNaN(Number(take)))
        take = 6;

    if(take < 1)
        take = 1;

    try{
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where:{
                type: type,
            }
        })

        console.log(products)

        const count = await prisma.product.count({
            where:{
                type: type,
            }
        });
        const totalPages = Math.ceil(count / take);

        return {
            currentPages: page,
            totalPages: totalPages,
            products: products.map(product => ({
              ...product,
              images: product.ProductImage.map(image => image.url)  
            }))
        }
    }
    catch(error){
        console.log(error)
        throw new Error("No se pudo cargar los productos");
    }
}