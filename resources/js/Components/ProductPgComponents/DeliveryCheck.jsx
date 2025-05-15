import { useState } from "react";
import { toast } from "react-toastify";

export default function DeliveryCheck() {
    const [pincode, setPincode] = useState("");

    const inputChange = (e) => {
        const numericOnly = e.target.value.replace(/\D/g, "");
        setPincode(numericOnly);
    };

    const handleForm = (e)=>{
        e.preventDefault();
        toast.success("Free Delivery Available");
    }

    return (
        <div>
            <form onSubmit={handleForm}>
                <div className="delivery-inp-container">
                    <input
                        type="text"
                        value={pincode}
                        maxLength={6}
                        onChange={inputChange}
                        placeholder="Enter 6-digit pincode"
                    />
                    <button className="submit-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </form>
        </div>
    );
}
