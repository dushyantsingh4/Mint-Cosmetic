import axios from 'axios';
import { CartContext } from '@/Context/CartContext';
import { useContext, useState } from 'react';
import { route } from 'ziggy-js';
import { toast } from 'react-toastify';
import { usePage, router } from '@inertiajs/react';

export default function ProceedToPayment() {
    const { auth } = usePage().props;
    const { cart } = useContext(CartContext);
    const [loading, setLoading] = useState(false)

    const handleProceedToPayment = async () => {
        if (!auth.customer) {
            router.visit(route('login'));
            return;
        }
        if (!cart.length) {
            toast.warn("Your cart is empty.");
            return;
        }
        setLoading(true);

        const cartItems = cart.map(item => ({
            product_id: item.id,
            color_id: item.color.id,
            quantity: item.quantity,
            price: item.price,
        }));

        const total_price = cart.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );

        try {
            const response = await axios.post(route('addCart'), { cart: cartItems, total_price: total_price });
            const orderId = response.data.order_id;
            
            router.visit(route('shipping', { order_id: orderId }));
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Unable to Proceed! Please try again later.');
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <button onClick={handleProceedToPayment} className="link-proceed" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
        </button>
    );
}
