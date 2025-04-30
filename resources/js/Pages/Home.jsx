import Layout from '../Layouts/Layout';
import Homeheader from '@/Components/Homeheader';
import ProductSlider from '@/Components/SwiperComponents/ProductSlider';
import { Head } from '@inertiajs/react';
import LongBanner from '@/Components/LongBanner';

const Home = ({categories, banners, products}) => {
    return (
        <Layout>
            <Head title="Home"/>
            <Homeheader banners={banners} categories={categories} />
            {/* <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-x-6">
                    
                </div>
            </div> */}
            <ProductSlider products={products} />
            <LongBanner imagePath={`banner/second-banner.jpg`} imageALt={`saleInfo`} />
            <ProductSlider products={products} />
            <ProductSlider products={products} />
        </Layout>
    );
};


export default Home;
