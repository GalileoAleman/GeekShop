"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const checkPayment = async (paypalTransactionId: string) => {
    //Obtengo el token de autenticación
    const authToken = await getPayPalBearerToken();

    if (!authToken) {
        return {
            ok: false,
            message: "No se pudo obtener el token de autenticación",
        };
    }

    //Se valida el pago
    const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

    if (!resp) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        }
    }

    const {status, purchase_units} = resp;

    console.log({status, purchase_units});
    
    const {invoice_id: orderId} = purchase_units[0]; //Invoice ID o order ID

    //Se valida si la orden esta pagada o no
    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'Aun no se ha pagado en PayPal'
        }
    }

    //Actualización en la base de datos
    try {
        await prisma.order.update({
            where: {id: orderId},
            data:  {
                isPaid: true,   
                paidDate: new Date()
            }
        })

        //Revalidar un path
        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true
        }
    }
    catch (error) {
        console.log(error);

        return {
            ok: false,
            message: '500 - El pago no se pudo realizar.'
        }
    }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPALCLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        "utf-8"
    ).toString("base64");

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(oauth2Url, {
            ...requestOptions,
            cache: 'no-store'
        }).then((r) => r.json());
   
        //Se obtiene el token de autenticacion de paypal
        return result.access_token;
    } 
    catch (error) {
        console.log(error);
        return null;
    }
};

const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string)
    : Promise<PayPalOrderStatusResponse|null> => {

    const paypalOrderUrl = `${ process.env.PAYPAL_ORDERS_URL }/${ paypalTransactionId }`;

    const myHeaders = new Headers();

    //Token
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {method: "GET", headers: myHeaders,};

    try {
        //Se valida el pago de paypal
        const resp = await fetch(paypalOrderUrl, {
            ...requestOptions,
            cache: 'no-store'
        }).then( r => r.json() );

        console.log({resp});
        
        return resp;
    } 
    
    catch (error) {
        console.log(error);
        
        return null;
    }
};
