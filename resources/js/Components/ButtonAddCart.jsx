import { CartContext } from "@/Context/CartContext";
import { useContext } from "react";
import { toast } from 'react-toastify';

const ButtonAddCart = ({ product, selectedColor, colorImages }) => {
    
    const cartContext = useContext(CartContext);
    const addToCart = (product) => {
        cartContext.dispatch({
            type: 'ADD_ITEM', payload: {
                id: product.id,
                name: product.product_name,
                price: product.discount_price,
                color: selectedColor,
                image: colorImages?.[0]?.image || product.image,
                quantity: 1
            }
        });
        toast.success(`${product.product_name} added to cart!`);
    }

    return (
        <button
            onClick={() => addToCart(product)}
            className="add-to-cart-btn"
        >
            Add to Cart
        </button>
    )
}

export default ButtonAddCart;