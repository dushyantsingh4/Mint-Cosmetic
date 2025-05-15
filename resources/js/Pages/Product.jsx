import { useState, useContext, useEffect, useMemo } from "react";
import { CartContext } from "@/Context/CartContext";
import { Head } from "@inertiajs/react"
import Layout from "@/Layouts/Layout"
import ButtonAddCart from "@/Components/ButtonAddCart";
import ColorCombination from "@/Components/ColorCombination";
import Accordion from "@/Components/Accordion";
import ProductImagesWrapper from "@/Components/ProductPgComponents/ProductImagesWrapper";
import ProductDescription from "@/Components/ProductPgComponents/ProductDescription";
import ReveiewSection from "@/Components/ProductPgComponents/ReviewSection";
import DeliveryCheck from "@/Components/ProductPgComponents/DeliveryCheck";

const Product = ({ product, colors, reviews }) => {
    console.log(reviews);

    const { cart, dispatch } = useContext(CartContext);
    const [selectedColor, setSelectedColor] = useState(colors[0] || null)
    const [selectedImage, setSelectedImage] = useState(product.image);

    const averageRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
      
        return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      }, [reviews]);

    useEffect(() => {
        setSelectedImage(selectedColor.images[0].url)
    }, [selectedColor])


    // cart functionality starts

    const item = cart.find(i => i.id === product.id);

    const addToCart = (product) => {
        dispatch({
            type: 'ADD_ITEM', payload: {
                id: product.id,
                name: product.product_name,
                price: product.discount_price,
                color: {
                    id: selectedColor.color_id,
                    name: selectedColor.name,
                    image: selectedColor.images[0].url,
                },
                quantity: 1
            }
        });
    }

    const decrementItem = (itemId) => {
        dispatch({
            type: 'DECREMENT_ITEM', payload: {
                id: itemId,
                color: {
                    id: selectedColor.color_id,
                }
            }
        })
    }

    // cart functionality ends 

    return (
        <Layout>
            <Head title={product.product_name}>
                <meta name="description" content={`${product.meta_description}`} />
                <meta name="keywords" content={`${product.meta_keywords}`} />
            </Head>
            <section>
                <div className="container mx-auto pt-28 p-4">
                    <div className="bg-white pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="flex sticky">
                                <ProductImagesWrapper colorImages={selectedColor.images} setSelectedImage={setSelectedImage} />
                                <div className="flex justify-center items-start w-full">
                                    <img src={`/storage/products/${selectedImage}`} alt={product.slug} />
                                </div>
                            </div>
                            <div className="px-4">
                                <h1 className="text-2xl">{product.product_name}</h1>
                                <p className="text-lg"><span className="line-through mr-2 text-base">Rs. {product.price}</span> Rs. {product.discount_price}</p>
                                <p className="text-gold text-sm"><i className="fa-solid fa-star"></i> {averageRating} </p>
                                {colors?.length > 0 && (
                                    <ColorCombination
                                        colors={colors}
                                        selectedColor={selectedColor}
                                        setSelectedColor={setSelectedColor}
                                    />
                                )}
                                <DeliveryCheck />
                                <div className="my-6">
                                    <div className="flex gap-2">
                                        <div className="text-sm">
                                            <button className="btn-qty-sub" onClick={() => decrementItem(product.id)} disabled={item?.quantity < 1}><i className={`fa-solid ${item ? 'fa-minus' : 'fa-ban'}`}></i></button>
                                            {item ? item.quantity : 1}
                                            <button className="btn-qty-add" onClick={() => addToCart(product)}><i className="fa-solid fa-plus"></i></button>
                                        </div>
                                        <ButtonAddCart selectedColor={selectedColor} product={product} />
                                    </div>
                                </div>
                                <Accordion title={"Product Description"} children={product.short_description} />
                                <div className="text-slate-500 px-2 my-6">
                                    <p><span className="font-semibold"><i className="fa-solid fa-truck-fast"></i></span> Free Shipping Available</p>
                                    <p><span className="font-semibold"><i className="fa-solid fa-arrow-rotate-left"></i></span> 10 Days Return/Replace Policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <ProductDescription heading={product.desc_head} description={product.description} />
            </section>
            <section>
                <ReveiewSection reviews={reviews} productId={product.id} averageRating={averageRating}/>
            </section>
        </Layout>
    )
}

export default Product