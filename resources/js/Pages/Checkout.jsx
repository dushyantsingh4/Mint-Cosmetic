import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Checkout() {
    <Head title='Checkout' />
    const { razorpay } = usePage().props;

    useEffect(() => {
        const loadScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                document.body.appendChild(script);
            });
        };

        const initializePayment = async () => {
            await loadScript();
            
            const options = {
                key: razorpay.key,
                amount: razorpay.amount,
                currency: 'INR',
                name: 'Your Company Name',
                order_id: razorpay.order_id,
                prefill: {
                    name: razorpay.name,
                    email: razorpay.email,
                    contact: razorpay.contact
                },
                handler: function(response) {
                    router.post(razorpay.callback_url, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    });
                },
                modal: {
                    ondismiss: function() {
                        console.log('Payment dismissed');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        initializePayment();
    }, []);

    return (
        <div className="p-4 text-center">
            <p>Loading payment gateway...</p>
        </div>
    );
}