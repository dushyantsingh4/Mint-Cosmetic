import SwiperWrapper from '@/Components/SwiperComponents/SwiperWrapper';
import ProductCard from '@/Components/ProductsPgComponents/ProductCard';

const ProductSlider = ({ title = '', products = [] }) => {
    return (
        <div className="bg-white container mx-auto my-4 rounded shadow-lg">
            <h2 className="head-title">{title.toUpperCase()}</h2>
            <div className="px-12 pb-4">
                <SwiperWrapper
                    items={products}
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    renderSlide={(product) => (
                        <div className="product-card h-full">
                            <ProductCard product={product} showViewLink={false}/>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default ProductSlider;
