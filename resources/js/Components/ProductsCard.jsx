import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import ButtonAddCart from './ButtonAddCart';
import { useState } from 'react';

const ProductsCard = ({ products })=>{
    console.log(products);
    const [selectedColor, setSelectedColor] = useState([]);
    return(
        <>
            {products.map((product, index) => (
                <div key={index} className='product-card'>
                    <div className="product-card-img mb-2">
                        <img
                            src={`/storage/products/${product.image}`}
                            alt={product.slug}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                    <div className="p-2">
                        <h3 className="text-slate-800 font-medium text-lg">{product.product_name}</h3>
                        <p className="text-slate-700">₹{product.discount_price} <span className='text-sm font-light line-through text-slate-400 ml-2'>₹{product.price}</span></p>
                        <div>
                            {product.colors.map((color, index)=>(
                                <button key={index}
                                onClick={()=>setSelectedColor(color)}
                                className={`color-show`} 
                                style={{backgroundColor: color.hex_code}}>
                                </button>
                            ))}
                        </div>
                        <p className={`font-extrathin text-sm ${product.stock_quantity > 0 ? 'text-slate-600' : 'text-red-600'}`}>
                            {product.stock_quantity > 0 ? 'In-Stock' : 'Out of Stock'}
                        </p>
                    </div>
                    <div className="flex justify-evenly mt-2">
                        <ButtonAddCart product={product} />
                        <Link href={`/product/${product.slug}`} className="product-v-d-link">
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ProductsCard;