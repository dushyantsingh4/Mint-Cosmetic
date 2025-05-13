import ProductCard from './ProductCard';

const ProductsCard = ({ products })=>{
    
    return(
        <>
            {products.map(product => (
                <div key={product.id} className='product-card'>
                    <ProductCard product={product} />
                </div>
            ))}
        </>
    )
}

export default ProductsCard;