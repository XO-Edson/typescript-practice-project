import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStateType = {
  cart: CartItemType[];
};

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {

    switch (action.type) {

        case REDUCER_ACTION_TYPE.ADD: {
            
            if (!action.payload) {
                throw new Error ("Action.payload missing in ADD action")
            }

            const { sku, name, price } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            const ItemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const qty:number = ItemExists ? ItemExists.quantity + 1 : 1
            
            return {...state,cart:[...filteredCart,{sku,name,price,quantity:qty}]}
            

        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error ("Action.payload missing in REMOVE action")
            }
            const { sku } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return {...state,cart:[...filteredCart]}
        }
            
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error("Action.payload missing in QUANTITY action")
            }
            const { sku, quantity } = action.payload

            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            const ItemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if (!ItemExists) {
                throw new Error("Item must exist...")
            }

            const updatedItem: CartItemType = { ...ItemExists, quantity }
            
            return {
                ...state, cart: [...filteredCart, updatedItem]

            }
        }
        case REDUCER_ACTION_TYPE.SUBMIT {
            return {...state,cart: []}
        }
        default:
            throw new Error ("Undefined reducer action type")
    }
}

const useCartContext = (initCartState: CartStateType) => {

    const [state, dispatch] = useReducer(reducer, initCartState)
    
    const REDUCER_ACTIONS = useMemo(() => {
       return REDUCER_ACTION_TYPE 
    }, [])
    
    const totalItems:number = state.cart.reduce((previousValue, cartItem)=> {
      return previousValue + cartItem.quantity
    },0)

    const totalPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
        state.cart.reduce((previousValue, cartItem)=> {
    return previousValue + (cartItem.quantity *cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const ItemB = Number(b.sku.slice(-4))
        return itemA - ItemB
    })
    
    return {dispatch ,REDUCER_ACTIONS,totalItems,totalPrice,cart}
}

export type useCartContextType = ReturnType<typeof useCartContext>

const initContextState: useCartContextType = {
    dispatch: () => { },
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: "",
    cart:[]
}

export const CartContext = createContext(initContextState)

type ChildrenType = {
    children?:ReactElement | ReactElement[]
}

export const cartProvider = ({ children }: ChildrenType): ReactElement => {

    const value = useCartContext(initCartState)

    return (
       < CartContext.Provider value={{value}}>
{children}
        </CartContext.Provider >
    )
    
}