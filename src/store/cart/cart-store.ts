import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  getSummaryInfo: () => {
        subTotal: number;
        fee: number;
        total: number;
        itemsCart: number;
    }

  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    //Se persiste la data de los productos con el middleware
    persist(
      (set, get) => ({
        cart: [],
  
        //El total de producto
        getTotalItems: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + item.quantity, 0);
        },
  
        //Se extrae la informacion de los productos para el detalle
        getSummaryInfo: () => {
            const { cart } = get();
    
            const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0);
            const fee = subTotal * 0.16;
            const total = subTotal + fee;
            const itemsCart = cart.reduce((total, item) => total + item.quantity, 0);
    
            return {
              subTotal,
              fee,
              total,
              itemsCart,
            };
          },
  
        //Agregar producto
        addProductTocart: (product: CartProduct) => {
          const { cart } = get();
  
          //Si el producto ya esta en el carrito 
          const productInCart = cart.some((item) => item.id === product.id);
  
          //Si el producto no esta en el carrito
          if (!productInCart) {
            //Agrego el nuevo producto
            set({ cart: [...cart, product] });
            return;
          }
  
          //El prodcuto ya existe asi que tengo que incrementar la cantidad
          const updatedCartProducts = cart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + product.quantity };
            }
  
            return item;
          });
  
          //Seteo el produto con la cantidad aumentada
          set({ cart: updatedCartProducts });
        },
  
        //Actualizar producto
        updateProductQuantity: (product: CartProduct, quantity: number) => {
          const { cart } = get();
  
          //Actualizo la cantidad de productos seleccionados
          const updatedCartProducts = cart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity: quantity };
            }
            return item;
          });
  
          set({ cart: updatedCartProducts });
        },
  
        //Eliminar producto
        removeProduct: (product: CartProduct) => {
          const { cart } = get();

          //Elimino el producto
          const updatedCartProducts = cart.filter(
            (item) => item.id !== product.id);
  
          set({ cart: updatedCartProducts });
        },
      }),
      {
        name: "shopping-cart",
      }
    )
  );

