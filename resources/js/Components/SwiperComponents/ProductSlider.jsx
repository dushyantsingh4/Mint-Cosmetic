import SwiperWrapper from '@/Components/SwiperComponents/SwiperWrapper';

const ProductSlider = ({ products }) => {
    return (
        <div className="bg-white container mx-auto my-4 rounded shadow-lg">
            <h2 className="text-2xl text-center py-6">FACE</h2>
            <div className="px-12 pb-4">
                <SwiperWrapper
                    items={products}
                    slidesPerView={4}
                    spaceBetween={20}
                    renderSlide={(product) => (
                        <>
                            <div className="swiper-slide-img-cont">
                                <img
                                    src={`/storage/products/cleanser.webp`}
                                    alt={product.name}
                                    className="w-full h-40 object-cover"
                                />
                            </div>
                            <p className="carouselName">{product.product_name}</p>
                            <p className="flex justify-center items-center text-sm"><span className="actual-price">Rs.{product.price}</span> Rs.{product.discount_price}</p>
                            <p className="flex justify-center">
                                <span className="block w-4 h-4 rounded-full border border-slate-800 p-1" style={{backgroundColor: '#a8e34d'}}></span>
                            </p>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default ProductSlider;