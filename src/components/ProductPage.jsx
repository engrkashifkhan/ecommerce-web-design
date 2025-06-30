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
  const productsPerPage = 6;

  // Initialize search from URL
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
    <div>
      <div className="hidden lg:flex min-h-screen bg-gray-100 p-6 gap-6">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {categories.map((item) => (
                <li key={item}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item)}
                      onChange={() =>
                        handleCheckbox(item, selectedCategories, setSelectedCategories)
                      }
                      className="mr-2"
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Brands</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {brands.map((brand) => (
                <li key={brand}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() =>
                        handleCheckbox(brand, selectedBrands, setSelectedBrands)
                      }
                      className="mr-2"
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Condition Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Condition</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {conditions.map((cond) => (
                <li key={cond}>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === cond}
                      onChange={() => setSelectedCondition(cond)}
                      className="mr-2"
                    />
                    {cond}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Minimum Rating</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {ratingOptions.map((rating) => (
                <li key={rating}>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="mr-2"
                    />
                    {rating.toFixed(1)}+
                  </label>
                </li>
              ))}
              <li>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === null}
                    onChange={() => setSelectedRating(null)}
                    className="mr-2"
                  />
                  Any Rating
                </label>
              </li>
            </ul>
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
      <div className="flex justify-center items-center my-6 space-x-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;













