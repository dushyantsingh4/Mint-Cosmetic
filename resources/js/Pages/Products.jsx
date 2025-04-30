import Layout from '../Layouts/Layout';
import SortDropdown from '@/Components/ProductsPgComponents/SortDropdown';
import FilterPanel from '@/Components/ProductsPgComponents/FilterPanel';
import ProductsWrapper from '@/Components/ProductsPgComponents/ProductsWrapper';
import LongBanner from '@/Components/LongBanner';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const Products = ({ category, products, subCategory })=>{
    const [sortBy, setSortBy] = useState('featured');
    const [selectedCategories, setSelectedCategories] = useState([]);   

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
          case 'a_z':
            return a.product_name.localeCompare(b.product_name);
          case 'z_a':
            return b.product_name.localeCompare(a.product_name);
          case 'low':
            return a.discount_price - b.discount_price;
          case 'high':
            return b.discount_price - a.discount_price;
          default:
            return 0;
        }
    });

    const filteredProducts = selectedCategories.length === 0
        ? sortedProducts
        : sortedProducts.filter(product =>
            selectedCategories.includes(String(product.category_id))
        );

    return (
        <Layout>
            <Head title={category.category_name}>
                <meta name="description" content={`${category.meta_description}`} />
                <meta name="keywords" content={`${category.meta_keywords}`} />
            </Head>
            <LongBanner imagePath={`category/${category.image}`} imageAlt={category.slug}/>
            <section>
                <div className="container mx-auto mt-8 mb-4 flex justify-between">
                    <div>
                        <h1 className='text-lg'>Showing Results for : {category.category_name}</h1>
                        <p className='text-slate-600 text-sm'>{ products.length } Results Found</p>
                    </div>
                    <SortDropdown sortBy={sortBy} setSortBy={setSortBy}/>
                </div>
            </section>
            <section>
                <div className="grid lg:grid-cols-[300px_1fr] gap-4 w-full">
                    <div className="bg-slate-100 py-5 px-9 sticky">
                        <h3 className='font-semibold text-slate-800 mb-2'>Filter Results</h3>
                        <FilterPanel subCategory={subCategory} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                    </div>
                    <div className="product-menu">
                        <ProductsWrapper products={filteredProducts}/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Products;