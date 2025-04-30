import React, { createContext, useReducer, useEffect} from "react";

export const CartContext = createContext();

const cartReducer = (state, action)=>{
    switch (action.type){
        case 'ADD_ITEM':{
            const existing = state.find(item => item.id === action.payload.id);
            if (existing) {
                return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            return [...state, action.payload];
        }

        case "DECREMENT_ITEM": {
            const targetItem = state.find(item => item.id === action.payload.id);
        
            if (targetItem) {
                if (targetItem.quantity > 1) {
                    return state.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    return state.filter(item => item.id !== action.payload.id);
                }
            }
        
            return state;
        }

        case "REMOVE_ITEM":
            return state.filter(item => item.id !== action.payload.id);

        case "CLEAR_CART":
            return [];

        default:
            return state;
    }
}



export const CartProvider = (props) => {
    const storedCart = localStorage.getItem("mint_cart");
    const initialState = storedCart ? JSON.parse(storedCart) : [];
    
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(()=>{
        localStorage.setItem("mint_cart", JSON.stringify(state))
    }, [state]);

    return (
        <CartContext.Provider value={{ cart:state , dispatch: dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}
