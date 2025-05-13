import { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";

export default function ReviewModal({ productId, onClose }) {
    const { auth } = usePage().props;

    const [showStars, setShowStars] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: productId,
        title: '',
        rating: 0,
        comment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reviews', {
            onSuccess: () => {
                reset();
                onClose(); 
            }
        });
    };

    if (!auth.user){
        router.visit('/login');
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Write a Review</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-1">
                        {[1,2,3,4,5].map((star) => (
                            <i key={star}
                               className={`fa-star ${star <= (data.rating || showStars) ? 'fa-solid text-yellow-500' : 'fa-regular text-gray-400'} cursor-pointer`}
                               onMouseEnter={() => setShowStars(star)}
                               onMouseLeave={() => setShowStars(0)}
                               onClick={() => setData('rating', star)}
                            ></i>
                        ))}
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                    </div>

                    <input
                        type="text"
                        placeholder="Review title"
                        className="w-full border rounded px-3 py-2"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

                    <textarea
                        rows="4"
                        placeholder="Write your review..."
                        className="w-full border rounded px-3 py-2"
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                    ></textarea>
                    {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}

                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
                            disabled={processing}
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
