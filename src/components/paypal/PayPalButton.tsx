"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { checkPayment, setTransactionId } from "@/actions";

interface Props {
    orderId: string;
    amount: number;
}

export const PayPalButton = ({orderId, amount}: Props) => {

    const [{isPending}] = usePayPalScriptReducer();

    const rountedAmount = (Math.round(amount * 100)) / 100; //Dos decimales

    if(isPending){
        return(
            <div className="animate-pulse mb-10">
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-12 bg-gray-300 rounded mt-2"></div>
            </div>
        )
    }

    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: "USD",
                        value: `${ rountedAmount }`,
                    }

                }
            ]
        });
    
        const {ok} = await setTransactionId(orderId, transactionId);

        if (!ok) {
          throw new Error('No se pudo actualizar la orden');
        }
        
        return transactionId;
    }

    const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {
    
        const details = await actions.order?.capture();
        
        if (!details?.id)
             return;

    
        await checkPayment(details.id);
    }

    return (
        <div className="relative z-0">
            <PayPalButtons createOrder={createOrder}
            onApprove={onApprove}/>
        </div>
    )
}
 