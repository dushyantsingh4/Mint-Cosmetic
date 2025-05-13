import { usePage } from "@inertiajs/react"
import { useState } from "react";
import ReviewModal from "./ReviewModel";
import Review from "./Reviews";
import Reviews from "./Reviews";

export default function ReveiewSection({ reviews, productId }){
    const {auth} = usePage().props;
    const [showForm, setShowForm] = useState(false);
    
    return(
        <div className="container mx-auto p-6 bg-white">
            <h2 className="text-3xl text-center mb-4">Product Reviews</h2>
            <div className="flex justify-center items-center gap-6 mb-4">
                <p className="text-2xl"><span className="text-gold"><i className="fa-solid fa-star"></i></span> 4.8 </p>
                <p>47 Reviews</p>
            </div>
            <div className="text-center">
                <button className="btn bg-primary text-sky-50 px-4 py-2 rounded shadow hover:shadow-lg mb-4" onClick={()=>setShowForm(true)}>Write a Review</button>
                {showForm && <ReviewModal productId={productId} onClose={() => setShowForm(false)} />}
            </div>
            <Reviews reviews={reviews}/>
        </div>
    )
}