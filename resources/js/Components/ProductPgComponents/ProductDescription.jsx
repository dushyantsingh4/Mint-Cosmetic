export default function ProductDescription({ heading, description}){
    return(
        <div className="container mx-auto p-6 bg-white">
            <div className="text-3xl font-medium mb-4 text-slate-800">
                {heading}
            </div>
            <div className="text-slate-700">
                {description}
            </div>
        </div>
    )
}