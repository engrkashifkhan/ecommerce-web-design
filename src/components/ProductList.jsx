import React, { useState } from "react";
import { Grid3x3GapFill, ListUl } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";

const ProductList = ({
  view,
  setView,
  currentProducts,
  handleViewDetails,
  addToCart,
  addToWishList,
  filteredProducts,
  indexOfFirstProduct,
  indexOfLastProduct,
  renderStars,
  searchQuery,
  setSearchQuery,
}) => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120 
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "#f3f4f6"
    },
    tap: { scale: 0.98 }
  };

  const notificationVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <main className="w-full lg:w-3/4 relative">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg z-[100] ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {notification.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <motion.p 
          className="text-gray-600 text-sm sm:text-base"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {searchQuery ? `"${searchQuery}": ` : ""}
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </motion.p>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setView("list")}
            className={`px-3 py-2 rounded-lg flex items-center text-xs sm:text-sm ${
              view === "list" ? "bg-white shadow" : "bg-transparent"
            }`}
          >
            <ListUl className="mr-1 sm:mr-2" /> List
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setView("grid")}
            className={`px-3 py-2 rounded-lg flex items-center text-xs sm:text-sm ${
              view === "grid" ? "bg-white shadow" : "bg-transparent"
            }`}
          >
            <Grid3x3GapFill className="mr-1 sm:mr-2" /> Grid
          </motion.button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`${
          view === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "flex flex-col gap-4"
        }`}
      >
        {currentProducts.length === 0 ? (
          <motion.div 
            className="col-span-full flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
            <p className="text-gray-500 text-center text-lg mb-4 max-w-md">
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : "No products match your current filters"}
            </p>
            {searchQuery && (
              <motion.button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
                onClick={() => setSearchQuery("")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Search
              </motion.button>
            )}
          </motion.div>
        ) : (
          currentProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                view === "list" ? "flex flex-col sm:flex-row" : "flex flex-col"
              }`}
            >
              <div className={`relative ${view === "list" ? "sm:w-1/3" : ""}`}>
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className={`w-full object-cover ${
                    view === "list" 
                      ? "h-48 sm:h-full" 
                      : "h-48 sm:h-56"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                  onClick={() => {
                    addToWishList(product);
                    showNotification(`${product.title} saved!`, 'success');
                  }}
                >
                  <FaHeart className="text-red-500" />
                </button>
              </div>
              
              <div className={`p-4 flex flex-col justify-between ${
                view === "list" ? "sm:w-2/3" : "flex-1"
              }`}>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">({product.rating.toFixed(1)})</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-bold text-red-600 mr-2">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-sm line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className={`flex gap-2 ${
                  view === "list" ? "sm:justify-start" : "justify-between"
                }`}>
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm"
                    onClick={() => handleViewDetails(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEye /> Details
                  </motion.button>
                  
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm"
                    onClick={() => {
                      addToCart(product);
                      showNotification(`${product.title} added to cart!`, 'success');
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaShoppingCart /> Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </main>
  );
};

export default ProductList;













