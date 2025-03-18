'use client'

import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface Props{
    children: React.ReactNode
}

export const Provider = ({children}: Props) => {
  return (
    <PayPalScriptProvider options={{
      clientId: process.env.NEXT_PUBLIC_PAYPALCLIENT_ID ?? "",
      intent:"capture",
      currency:"USD"
    }}>
      <SessionProvider>
          {children}
      </SessionProvider>
    </PayPalScriptProvider>
  )
}
