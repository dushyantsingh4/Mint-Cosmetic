import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import ProductsCard from "@/Components/ProductsCard";

const Search = ({ query, products })=>{
    return (
        <Layout>
            <Head title="Search" />
            <section>
                <div className="container mx-auto mt-28 mb-4 lg:mb-8 bg-white px-4 lg:px-8 py-4 lg:py-8">
                    <h1 className="text-xl mb-4">Products Related to : {query}</h1>
                    <p className='text-slate-600 text-sm'>{ products.length } Results Found</p>
                    {products.length === 0 ? (
                        <>
                            <div className="flex justify-center items-center">
                                <img src="/storage/site/no-product.jpg" className="h-96" />
                            </div>
                            <p className="text-2xl text-center mb-4">No Product Found! Please try with another keyword</p>
                        </>
                    ) : (
                        <div className="search-menu">
                            <ProductsCard products={products}/>
                        </div>
                    )}      
                </div>
            </section>
        </Layout>
    )
}

export default Search;