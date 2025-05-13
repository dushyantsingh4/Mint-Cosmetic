import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

const Homeheader = ({banners, categories})=>{
    return (
        <>
            <header 
                style={{ backgroundImage: `url('/storage/banner/${banners[0]?.banner}')` }}
                className="h-[80vh] bg-center bg-cover"
            >
            </header>
            <section className="relative mx-20">
                <div className="absolute top-[-80px] w-full grid grid-cols-6 text-center bg-white py-3 rounded-lg shadow-lg">
                    <div className="border-r border-r-slate-300 px-4 py-2 text-gray-600 hover:text-gray-800"><Link href={route('products', {slug: 'new-launches'})}>New Launches</Link></div>
                    {categories.map((category, index)=>(
                        <div key={index} className="border-x border-x-slate-300 px-4 py-2 text-gray-600 hover:text-gray-800">
                            <Link href={route('products', {slug: category.slug})}>
                                {category.category_name}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
)}

export default Homeheader;