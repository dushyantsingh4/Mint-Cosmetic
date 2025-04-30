import { route } from 'ziggy-js';
import ProductCart from './ProductCard';

const ProductsCard = ({ products })=>{
    
    return(
        <>
            {products.map((product, index) => (
                <div key={index} className='product-card'>
                    <ProductCart product={product} />
                </div>
            ))}
        </>
    )
}

export default ProductsCard;