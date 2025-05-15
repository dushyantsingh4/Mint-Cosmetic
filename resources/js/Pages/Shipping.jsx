import Layout from "@/Layouts/Layout";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { CartContext } from "@/Context/CartContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Shipping() {
    const { auth, order_id } = usePage().props;
    const { cart } = useContext(CartContext);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
    });  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cart.length) {
            toast.warn("Your cart is empty.");
            return;
        }

        const requiredFields = ['name', 'phone', 'address', 'city', 'pincode', 'state'];

        for (const field of requiredFields) {
            if (!data[field]) {
                toast.error(`Please fill in your ${field}.`);
                return;
            }
        }

        if (!/^\d{6}$/.test(data.pincode)) {
            toast.error("Invalid pincode. Must be 6 digits.");
            return;
        }

        if (!/^\d{10}$/.test(data.phone)) {
            toast.error("Invalid phone number. Must be 10 digits.");
            return;
        }

        post(route('checkout'), {
            shipping: data,
        }, {
        preserveScroll: true,
        onSuccess: (page) => {
            console.log(page);
            if (page.props.payment_url) {
                // window.location.href = page.props.payment_url;
                
            }
        },
        onError: (errors) => {
            toast.error("Something went wrong during checkout.");
    }
});

    };

    return (
        <Layout>
            <Head title="Checkout" />

            <section>
                <div className="container mx-auto mt-28 mb-4 px-4 py-8 bg-white border border-stone-200 rounded shadow-sm">
                    <h1 className="text-2xl mb-4">Shipping Details</h1>
                    <hr />
                    <div className="flex items-start gap-4 pt-4">
                        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 w-full lg:w-1/2">
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>

                            <div>
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                />
                                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                            </div>

                            <div>
                                <label>Address</label>
                                <textarea
                                    className="form-input"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                />
                                {errors.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                            </div>

                            <div>
                                <label>City</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={data.city}
                                    onChange={(e) => setData("city", e.target.value)}
                                />
                                {errors.city && <div className="text-red-500 text-sm">{errors.city}</div>}
                            </div>

                            <div>
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={data.pincode}
                                    onChange={(e) => setData("pincode", e.target.value)}
                                />
                                {errors.pincode && <div className="text-red-500 text-sm">{errors.pincode}</div>}
                            </div>

                            <div>
                                <label>State</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={data.state}
                                    onChange={(e) => setData("state", e.target.value)}
                                />
                                {errors.state && <div className="text-red-500 text-sm">{errors.state}</div>}
                            </div>

                            <button
                                type="submit"
                                className="btn-primary mt-4"
                                disabled={processing}
                            >
                                {processing ? "Processing..." : "Continue to Checkout"}
                            </button>
                        </form>
                        <div className="w-full lg:w-1/2 mt-10 lg:mt-0 bg-gray-50 p-6 rounded-md shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Cart Summary</h2>
                            <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                {cart.length > 0 ? (
                                    cart.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center border-b gap-10 pb-2"
                                        >
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-gray-800">
                                                ₹{item.price * item.quantity}
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Your cart is empty.</p>
                                )}
                            </ul>
                            <div className="mt-6 border-t pt-4 text-right">
                                <p className="text-lg font-bold">
                                    Total: ₹
                                    {cart.reduce(
                                        (total, item) => total + item.price * item.quantity,
                                        0
                                    )}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
}
