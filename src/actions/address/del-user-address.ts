'use server';

import { prisma } from "@/lib/prisma";

export const delUserAddress = async( userId: string ) => {

    try {
        //Se borra la direccion del user
        const deleted = await prisma.userAddress.delete({
            where: { userId }
        });

        return { ok: true };
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'No se pudo eliminar la direccion'
        }
    }
}
