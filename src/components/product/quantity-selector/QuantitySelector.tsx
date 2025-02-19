'use client'

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props{
    quantity: number;
    stock: number;
}

export const QuantitySelector = ({quantity, stock}: Props) => {

  const [count, setCount] = useState(quantity,);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
  
    if (count + value > stock) 
        return;
  
    setCount(count + value);
  }  

  return (
    <div className="flex">
        <button onClick={()=> onQuantityChanged(-1)}>
            <IoRemoveCircleOutline size={30}/>
        </button>

        <span className="w-20 mx-3 px-5 bg-slate-100 text-center text-black rounded">{count}</span>

        <button onClick={()=> onQuantityChanged(+1)}>
            <IoAddCircleOutline size={30}/>
        </button>
    </div>
  )
}
