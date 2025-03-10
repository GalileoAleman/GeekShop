'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props{
    quantity: number;
    stock: number;
    onQuantityChanged: ( value: number ) => void; 
}

export const QuantitySelector = ({quantity, stock, onQuantityChanged}: Props) => {

  const onValChange = (value: number) => {
    if (quantity + value < 1)
       return;
  
    if (quantity + value > stock) 
        return;
  
    onQuantityChanged(quantity + value);
  };  

  return (
    <div className="flex">
        <button onClick={()=> onValChange(-1)}>
            <IoRemoveCircleOutline size={30}/>
        </button>

        <span className="w-20 mx-3 px-5 bg-slate-100 text-center text-black rounded">{quantity}</span>

        <button onClick={()=> onValChange(+1)}>
            <IoAddCircleOutline size={30}/>
        </button>
    </div>
  )
}
