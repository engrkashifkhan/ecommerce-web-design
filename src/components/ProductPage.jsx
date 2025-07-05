import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  allProducts,
  categories,
  brands,
  conditions,
  ratingOptions,
} from "../data/products";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import { FaFilter, FaTimes, FaSearch, FaChevronLeft } from "react-icons/fa";

const ProductPage = ({ cartItems, addToCart, addToWishList, removeFromCart, renderStars }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState("grid");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("Any");
  const [selectedRating, setSelectedRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const productsPerPage = 6;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [location.search]);

  const filteredProducts = allProducts.filter((product) => {
    const matchSearch = searchQuery
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchCondition =
      selectedCondition === "Any" || product.condition === selectedCondition;
    const matchRating =
      selectedRating === null || product.rating >= selectedRating;

    return matchSearch && matchCategory && matchBrand && matchCondition && matchRating;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, selectedCondition, selectedRating, searchQuery]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckbox = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedCondition("Any");
    setSelectedRating(null);
    setSearchQuery("");
  };

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        addToCart={addToCart}
        renderStars={renderStars}
        addToWishList={addToWishList}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-30 bg-white shadow-sm p-4 flex items-center">
        {showMobileSearch ? (
          <div className="flex items-center w-full">
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="mr-2 text-gray-600"
            >
              <FaChevronLeft />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-xl font-bold flex-1">Products</div>
            <button 
              onClick={() => setShowMobileSearch(true)}
              className="p-2 mr-3 text-gray-600"
            >
              <FaSearch size={18} />
            </button>
            <button
              onClick={() => setShowFilters(true)}
              className="p-2 bg-blue-600 text-white rounded-lg"
            >
              <FaFilter size={18} />
            </button>
          </>
        )}
      </div>

      {/* Mobile Filter Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <div className="flex items-center">
                <button 
                  onClick={clearAllFilters}
                  className="text-blue-600 mr-4 text-sm"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="mb-6 lg:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
             <div className="flex justify-between items-center mb-3">
               <div>
                <h3 className="font-semibold mb-3 text-lg">Category</h3>
              </div>
              <div>
                 <button 
                  onClick={clearAllFilters}
                  className="text-blue-600 mr-4 text-sm"
                >
                  Clear All
                </button>
              </div>
             </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleCheckbox(item, selectedCategories, setSelectedCategories)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategories.includes(item)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-lg">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => handleCheckbox(brand, selectedBrands, setSelectedBrands)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedBrands.includes(brand)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-lg">Condition</h3>
              <div className="flex flex-wrap gap-2">
                {conditions.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCondition === cond
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-lg">Minimum Rating</h3>
              <div className="flex flex-wrap gap-2">
                {ratingOptions.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedRating === rating
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {rating.toFixed(1)}+
                  </button>
                ))}
                <button
                  onClick={() => setSelectedRating(null)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedRating === null
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Any Rating
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 shadow-md"
            >
              Show {filteredProducts.length} Products
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
        {/* Desktop Sidebar (without search field) */}
        <aside className="hidden lg:block w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="text-blue-600 text-sm"
            >
              Clear all
            </button>
          </div>

          {/* Removed search field from desktop sidebar */}

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCheckbox(item, selectedCategories, setSelectedCategories)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategories.includes(item)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">Brands</h3>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleCheckbox(brand, selectedBrands, setSelectedBrands)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedBrands.includes(brand)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">Condition</h3>
            <div className="flex flex-wrap gap-2">
              {conditions.map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCondition === cond
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-lg">Minimum Rating</h3>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedRating === rating
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {rating.toFixed(1)}+
                </button>
              ))}
              <button
                onClick={() => setSelectedRating(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedRating === null
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Any Rating
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <ProductList
          view={view}
          setView={setView}
          currentProducts={currentProducts}
          handleViewDetails={handleViewDetails}
          addToCart={addToCart}
          addToWishList={addToWishList}
          filteredProducts={filteredProducts}
          indexOfFirstProduct={indexOfFirstProduct}
          indexOfLastProduct={indexOfLastProduct}
          cartItems={cartItems}
          renderStars={renderStars}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center items-center my-6 px-4">
          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-30 text-sm"
            >
              Previous
            </button>

            {Array.from(
              { length: Math.ceil(filteredProducts.length / productsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border shadow-sm hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
              className="px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-30 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;



























