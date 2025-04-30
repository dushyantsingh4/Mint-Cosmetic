const LongBanner = ({ imagePath, imageALt})=>{
    return (
        <div>
            <img className="w-full h-60 object-cover" src={`/storage/${imagePath}`} alt={imageALt} />
        </div>
    )
}

export default LongBanner;