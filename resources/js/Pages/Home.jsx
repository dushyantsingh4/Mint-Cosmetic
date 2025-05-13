import Layout from '../Layouts/Layout';
import Homeheader from '@/Components/Homeheader';
import ProductSlider from '@/Components/SwiperComponents/ProductSlider';
import { Head } from '@inertiajs/react';
import LongBanner from '@/Components/LongBanner';
import InstagramReel from '@/Components/InstagramReel';

const Home = ({categories, banners, newProducts, featuredProducts, lipProducts, faceProducts}) => {
    return (
        <Layout>
            <Head title="Home"/>
            <Homeheader banners={banners} categories={categories} />
            <ProductSlider title={'Featured Products'} products={featuredProducts} />
            <ProductSlider title={'Just Arrived'} products={newProducts} />
            <LongBanner imagePath={`banner/second-banner.jpg`} imageALt={`saleInfo`} />
            <ProductSlider title={'Lips'} products={lipProducts} />
            <ProductSlider title={'Face'} products={faceProducts} />
            <div className='bg-white container mx-auto my-4 rounded shadow-lg'>
                <InstagramReel />
            </div>
        </Layout>
    );  
};


export default Home;
