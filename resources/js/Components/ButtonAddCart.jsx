import { CartContext } from "@/Context/CartContext";
import { useContext } from "react";
import { toast } from 'react-toastify';

const ButtonAddCart = ({ product, selectedColor, showViewLink=true}) => {
    
    const { dispatch } = useContext(CartContext);

    const addToCart = (product, selectedColor) => {
        console.log(product);
        console.log(selectedColor);
        dispatch({
            type: 'ADD_ITEM', payload: {
                id: product.id,
                name: product.product_name,
                price: product.discount_price,
                color: {
                    id: selectedColor.color_id,
                    name: selectedColor.name,
                    image: selectedColor.images[0].url,
                },
                quantity: 1
            }
        });
        toast.success(`${product.product_name} added to cart!`);
    }

    return (
        <button
            onClick={() => addToCart(product, selectedColor)}
            className={`add-to-cart-btn ${showViewLink ? '' : 'w-full mx-4'}`}
        >
            Add to Cart
        </button>
    )
}

export default ButtonAddCart;