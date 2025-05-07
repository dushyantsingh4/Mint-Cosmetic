import { usePage } from "@inertiajs/react"

export default function ReveiewSection(){
    const {auth} = usePage().props;
    
    return(
        <div className="container mx-auto p-6 bg-white">
            <h2 className="text-3xl text-center mb-4">Product Reviews</h2>
            <div className="flex justify-center items-center gap-6 mb-4">
                <p className="text-2xl"><span className="text-gold"><i className="fa-solid fa-star"></i></span> 4.8 </p>
                <p>47 Reviews</p>
            </div>
            <div className="text-center">
                <button className="btn bg-primary text-sky-50 px-4 py-2 rounded shadow hover:shadow-lg mb-4">Write a Review</button>
            </div>
            {/* <hr /> */}
            <div className="flex justify-center gap-y-4 border-b border-b-slate-300">
                <div className="w-1/4 my-4">
                    <p className="text-slate-600 font-semibold">Karan</p>
                    <img width={'40px'} src="/storage/site/user.png" alt="user" className="mt-2" />
                </div>
                <div className="w-3/4 my-4">
                    <div className="flex justify-between">
                        <p className="text-gold font-thin text-sm mb-2">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </p>
                        <p className="text-xs font-thin text-slate-500">5-May-2025</p>
                    </div>
                    <p className="text-lg font-bold text-slate-800">Bahut hi behtereen product h</p>
                    <p>abhi lelo nhi toh muh de dunga choco</p>
                </div>
            </div>
        </div>
    )
}