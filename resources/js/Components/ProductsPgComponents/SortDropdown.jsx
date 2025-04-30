const SortDropdown = ({sortBy, setSortBy})=>{
    return(
        <div>
            <label htmlFor="sortBy">Sort By: </label>
            <select name="sortBy" id="sortBy" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="best_selling">Best Selling</option>
                <option value="a_z">A-Z , Alphabet Ascending</option>
                <option value="z_a">Z-A , Alphabet Descending</option>
                <option value="low">Price - Low to High</option>
                <option value="high">Price - High to Low</option>
            </select>
        </div>
    )
}

export default SortDropdown;