const ColorCombination = ({ colors, selectedColor, setSelectedColor })=>{
    return(
        <>
            <p className="text-sm font-bold my-4 text-stone-700 ">COLOR: {selectedColor.name.toUpperCase()}</p>
            <div className="flex gap-2">
                {colors.map((color) => (
                    <button key={color.color_id}
                     onClick={()=>setSelectedColor(color)}
                     className={`color-show ${selectedColor.color_id === color.color_id ? 'active-color' : ''}`} 
                     style={{backgroundColor: color.hex_code}}>
                     </button>
                ))}
            </div>
        </>
    )
}

export default ColorCombination; 