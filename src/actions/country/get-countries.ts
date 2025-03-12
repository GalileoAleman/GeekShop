'use server';

import { prisma } from "@/lib/prisma";

export const getCountries = async() => {

    try {
        //Obtengo los paises de la BD
        const countries = await prisma.country.findMany({
            orderBy: {
            name: 'asc'
            }
        });

        return countries;

    } catch (error) {
        console.log(error);
        return [];
    }
}
