import { Link } from '@inertiajs/react';

const ProductGrid = () => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg">
                <h3 className="text-2xl text-center my-8">Newly Arrivals</h3>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="h-40 mb-4">
                        <img className="w-full h-full object-contain"
                            src="{{ asset('storage/products/[GetPaidStock.com]-6780fe05b433c.jpg') }}"
                            alt="Product Name" />
                    </div>
                    <div className="h-40">
                        <img className="w-full h-full object-contain"
                            src="{{ asset('storage/products/[GetPaidStock.com]-6780fe05b433c.jpg') }}"
                            alt="Product Name" />
                    </div>
                    <div className="h-40">
                        <img className="w-full h-full object-contain"
                            src="{{ asset('storage/products/[GetPaidStock.com]-6780fe05b433c.jpg') }}"
                            alt="Product Name" />
                    </div>
                    <div className="h-40">
                        <img className="w-full h-full object-contain"
                            src="{{ asset('storage/products/[GetPaidStock.com]-6780fe05b433c.jpg') }}"
                            alt="Product Name" />
                    </div>
                </div>
                <div className="text-center my-6">
                    <button className="pri-link-btn">
                        <a href="#">Explore All &rarr;</a>
                    </button>
                </div>
            </div>
        </>
    )

}

export default ProductGrid;