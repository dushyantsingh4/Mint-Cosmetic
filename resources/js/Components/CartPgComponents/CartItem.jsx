import { CartContext } from "@/Context/CartContext";
import { useContext } from "react";

const CartItem = ()=>{
    const { cart, dispatch} = useContext(CartContext);

    const incrementItem = (itemId, colorId)=>{
        dispatch({type: 'ADD_ITEM' , payload:{
            id: itemId,
            color: {
                id: colorId
            }
        }})
    }

    const decrementItem = (itemId, colorId)=>{
        dispatch({type: 'DECREMENT_ITEM', payload:{
            id: itemId,
            color: {
                id: colorId
            }
        }})
    }

    const removeItem = (itemId, colorId)=>{
        dispatch({type: 'REMOVE_ITEM', payload: {
            id: itemId,
            color: {
                id: colorId
            }
        }})
    }

    
    return(
        <>
        <p className="text-sm my-1">Items in Cart: {cart.length}</p>
        {cart.map((item, index) =>(
            <div key={index}>
                <div className="cart-item">
                    <div className="cart-img-container">
                        <img src={`/storage/products/${item.color.image}`} alt={item.name} />
                    </div>
                    <div className="item-details-container">
                        <div>
                            <h3 className="text-lg">{item.name}</h3>
                            <p className="text-stone-600 text-sm my-1">Color: {item.color.name.toUpperCase()}</p>
                            <p className="text-stone-600 text-sm">Quantity : {item.quantity}</p>
                            <div className="text-sm">
                                <button className="btn-qty-sub" onClick={()=>decrementItem(item.id, item.color.id)}><i className={`fa-solid ${item.quantity > 1 ? 'fa-minus' : 'fa-trash-can'}`}></i></button>
                                {item.quantity}
                                <button className="btn-qty-add" onClick={()=>incrementItem(item.id, item.color.id)}><i className="fa-solid fa-plus"></i></button>
                                <button className="btn-qty-rmv" onClick={()=>removeItem(item.id, item.color.id)}><i className="fa-solid fa-trash-can"></i> Remove</button>
                            </div>
                            <p className="text-stone-600 text-sm my-1">Price: {item.price}</p>
                        </div>
                        <p className="mr-2">₹ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>      
            </div>
        ))}
        </>
    )

}

export default CartItem;