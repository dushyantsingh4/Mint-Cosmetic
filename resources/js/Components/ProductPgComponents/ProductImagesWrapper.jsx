const ProductImagesWrapper = ({ colorImages, setSelectedImage })=>{
    return (
        <div className="flex flex-col gap-2 mx-2">

            {colorImages.map((colorImage, index) => (
                
                <button key={index} 
                 onClick={()=>{
                    setSelectedImage(colorImage.url)
                 }}
                >
                    <img src={`/storage/products/${colorImage.url}`} className="w-24 h-24 object-cover border-2"/>
                </button>
            ))}
        </div>
    )
}

export default ProductImagesWrapper