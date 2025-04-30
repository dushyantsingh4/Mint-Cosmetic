import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/Context/CartContext";
import { Head } from "@inertiajs/react"
import Layout from "@/Layouts/Layout"
import ButtonAddCart from "@/Components/ButtonAddCart";
import ColorCombination from "@/Components/ColorCombination";
import Accordion from "@/Components/Accordion";
import ProductImagesWrapper from "@/Components/ProductImagesWrapper";

const Product = ({ product, colors, colorImage }) => {

    const { cart, dispatch} = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState(colors[0] || null)
    const [colorImages, setColorImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(product.image);

    useEffect(()=>{
        if (!selectedColor || !colorImage?.length) return;
        const selectedColorImages = colorImage.find(color => color.color.id === selectedColor.id);
        setColorImages(selectedColorImages.images);
    }, [selectedColor])

    useEffect(() => {
        if (colorImages.length > 0) {
            setSelectedImage(colorImages[0].image);
        }
    }, [colorImages]);
    


    // cart functionality starts

    const item = cart.find(i => i.id === product.id);

    const addToCart = (product)=>{
           dispatch({ type: 'ADD_ITEM', payload: {
                id: product.id,
                name: product.product_name,
                price: product.discount_price,
                color: selectedColor,
                image: colorImages?.[0]?.image || product.image,
                quantity: 1
            } });
        }

    const decrementItem = (itemId)=>{
        dispatch({type: 'DECREMENT_ITEM', payload:{
            id: itemId
        }})
    }

    // cart functionality ends 

    return (
        <Layout>
            <Head title={product.product_name}>
                <meta name="description" content={`${product.meta_description}`} />
                <meta name="keywords" content={`${product.meta_keywords}`} />
            </Head>
            <section>
                <div className="container mx-auto mt-28 mb-4 p-4 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex sticky">
                            <ProductImagesWrapper colorImages={colorImages} setSelectedImage={setSelectedImage} />
                            <div className="flex justify-center items-center w-full">
                                <img src={`/storage/products/${selectedImage}`} alt={product.slug} />
                            </div>
                        </div>
                        <div className="px-4">
                            <h1 className="text-2xl">{product.product_name}</h1>
                            <p className="text-lg"><span className="line-through mr-2 text-base">Rs. {product.price}</span> Rs. {product.discount_price}</p>
                            <p className="text-gold text-sm"><i className="fa-solid fa-star"></i> 4.8 </p>
                            {colors?.length > 0 && (
                            <ColorCombination
                                colors={colors}
                                selectedColor={selectedColor}
                                setSelectedColor={setSelectedColor}
                            />
                            )}
                            <div className="my-6">
                                <div className="flex gap-2">
                                    <div className="text-sm">
                                        <button className="btn-qty-sub" onClick={() => decrementItem(product.id)} disabled={item?.quantity < 1}><i className={`fa-solid ${item ? 'fa-minus' : 'fa-ban'}`}></i></button>
                                        {item ? item.quantity : 1 }
                                        <button className="btn-qty-add" onClick={() => addToCart(product)}><i className="fa-solid fa-plus"></i></button>
                                    </div>
                                    <ButtonAddCart colorImages={colorImages} selectedColor={selectedColor} product={product} />
                                </div>
                            </div>
                            <Accordion title={"Product Description"} children={product.description}/>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Product