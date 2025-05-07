import { Link } from "@inertiajs/react";
import ButtonAddCart from "../ButtonAddCart";
import { useEffect, useState } from "react";

const ProductCart = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
    const [selectedImage, setSelectedImage] = useState(selectedColor.images);

    useEffect(()=>{
        setSelectedImage(selectedColor.images);
    }, [selectedColor])
    
    return (
        <>  
            <div className="product-card-img">
                {/* Default image */}
                <img
                    src={`/storage/products/${selectedImage?.[0].url}`}
                    alt={product.slug}
                    className="w-full h-48 object-cover transition-opacity duration-300 ease-in-out"
                />
                {/* Hover image (second image) */}
                {selectedImage?.[1]?.url && (
                    <img    
                        src={`/storage/products/${selectedImage?.[1].url}`}
                        alt={product.slug}
                        className="w-full h-48 object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                    />
                )}
            </div>
            <div className="p-2">
                <h3 className="text-slate-800 font-medium text-lg">{product.product_name}</h3>
                <p className="text-slate-700">₹{product.discount_price} <span className='text-sm font-light line-through text-slate-400 ml-2'>₹{product.price}</span></p>
                <div>
                    {product.colors.map((color, index) => (
                        <button key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`color-show`}
                            style={{ backgroundColor: color.hex_code }}>
                        </button>
                    ))}
                </div>
                <p className="text-sm text-slate-600">{selectedColor.name.charAt(0).toUpperCase() + selectedColor.name.slice(1)}</p>
                <p className={`font-extrathin text-sm ${product.stock_quantity > 0 ? 'text-slate-600' : 'text-red-600'}`}>
                    {product.stock_quantity > 0 ? 'In-Stock' : 'Out of Stock'}
                </p>
            </div>
            <div className="flex justify-evenly mt-2">
                <ButtonAddCart selectedColor={selectedColor} product={product} />
                <Link href={`/product/${product.slug}`} className="product-v-d-link">
                    View Details
                </Link>
            </div>
        </>
    )
}

export default ProductCart;