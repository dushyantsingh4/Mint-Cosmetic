const FilterPanel = ({ subCategory, selectedCategories, setSelectedCategories, subProduct }) => {

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
        }
    };


    return (
        <>
            <p>Explore Products in:</p>
            <div className="mb-2">
                {subCategory.map((category, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`subcat-${index}`}
                            value={category.id}
                            checked={selectedCategories.includes(String(category.id))}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`subcat-${index}`} className="text-sm ml-1">
                            {category.category_name}
                        </label>
                    </div>
                ))}
            </div>
            <hr />
            {/* <p>Colors:</p> */}
        </>
    );
};

export default FilterPanel;
