import { CartContext } from "@/Context/CartContext";
import { Link } from "@inertiajs/react";
import { useContext } from "react";

const BreakUp = ()=>{
    const { cart } = useContext(CartContext);
    return(
        <div className="bg-stone-100 border border-stone-200 mt-8 mx-2 px-2 py-3 rounded">
            <p className="mb-2 font-semibold">Price Details:</p>
            <div className="border-y border-stone-400">
                {cart.map((item, index) =>{ return(
                    <div key={index} className="my-4">
                        <div className="flex justify-between w-full items-center">
                            <p>{item.name} X {item.quantity} <span className="text-xs">(1 unit: {item.price})</span></p>
                            <p>₹ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                )})}
            </div>
            <div className="mt-1 flex justify-between w-full items-center">
                <p>SubTotal: </p>
                <p>₹ {cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}</p>
            </div>
            <div className="mt-1 flex justify-between w-full items-center">
                <p className="text-sm">Discount:</p>
                <p className="text-sm">₹ 0.00</p>
            </div>
            <div className="mt-2 flex justify-between w-full items-center">
                <p>Total:</p>
                <p>₹ {cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}</p>
            </div>
            <div>
                <Link href={'#'} className="link-proceed">Proceed to Payment</Link>
            </div>
        </div>
    )
}

export default BreakUp;