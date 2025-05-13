import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperWrapper = ({
    items = [],
    renderSlide,
    slidesPerView = 1,
    spaceBetween = 0,
    autoplay = true,
    loop = true,
    showNavigation = true,
    showPagination = true,
    className = '',
    breakpoints = {} // <-- accept breakpoints
}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation={showNavigation}
            pagination={showPagination ? { clickable: true } : false}
            autoplay={autoplay ? { delay: 3000 } : false}
            loop={loop}
            breakpoints={breakpoints}
            className={className}
        >
            {items.map((item, index) => (
                <SwiperSlide key={index}>
                    {renderSlide(item, index)}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperWrapper;
