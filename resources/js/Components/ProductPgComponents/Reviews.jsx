export default function Reviews({ reviews }) {
    return (
        <>
        {reviews.map((review, index) => (
                <div key={index} className="flex justify-center gap-y-4 border-b border-b-slate-300">
                    <div className="w-1/4 my-4">
                        <p className="text-slate-600 font-semibold">{review.customer}</p>
                        <img width={'40px'} src={`/storage/customer/${review.avatar}`} alt={review.customer} className="mt-2" />
                    </div>
                    <div className="w-3/4 my-4">
                        <div className="flex justify-between">
                            <p className="text-gold font-thin text-sm mb-2">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                            </p>
                            <p className="text-xs font-thin text-slate-500">{review.created_at}</p>
                        </div>
                        <p className="text-lg font-bold text-slate-800">{review.title}</p>
                        <p>{review.comment}</p>
                    </div>
                </div>
            ))
        }
        </>
    )
}