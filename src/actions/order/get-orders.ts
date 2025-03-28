'use server';

import { auth } from '@/auth.config';
import { prisma } from '@/lib/prisma';

export const getOrders = async() => {

    const session = await auth();

    if (session?.user.role !== "admin") {
        return {
            ok: false,
            message: 'Debe de estar autenticado.'
        }
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            created: 'desc'
        },
        include: {
            OrderAddress: {
            select: {
                firstName: true,
                lastName: true
            }
            }
        }
    })

    return {
        ok: true,
        orders: orders,
    }
}
