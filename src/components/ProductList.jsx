import React, { useState } from "react";
import { Grid3x3GapFill, ListUl } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

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

  // Show custom notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Animation variants
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
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
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
    <main className="w-3/4 relative">
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

      <div className="flex justify-between items-center mb-4">
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {searchQuery ? `Search results for "${searchQuery}": ` : ""}
          Showing {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
          {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </motion.p>

        <div className="flex gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setView("list")}
            className={`px-4 py-2 border rounded flex items-center ${
              view === "list" ? "bg-gray-200" : "bg-white"
            }`}
          >
            <ListUl className="mr-2" /> List View
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setView("grid")}
            className={`px-4 py-2 border rounded flex items-center ${
              view === "grid" ? "bg-gray-200" : "bg-white"
            }`}
          >
            <Grid3x3GapFill className="mr-2" /> Grid View
          </motion.button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={`grid ${
          view === "grid" ? "grid-cols-3 gap-6" : "grid-cols-1 gap-4"
        }`}
      >
        {currentProducts.length === 0 ? (
          <motion.div 
            className="col-span-3 flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg mb-4">
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : "No products match your filters."}
            </p>
            {searchQuery && (
              <motion.button
                className="text-blue-600 hover:underline"
                onClick={() => setSearchQuery("")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear search
              </motion.button>
            )}
          </motion.div>
        ) : (
          currentProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              className={`bg-white p-4 shadow rounded flex ${
                view === "list" ? "flex-row" : "flex-col items-center"
              } transition-shadow`}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className={`${
                  view === "list"
                    ? "w-32 h-32 mr-6 object-cover"
                    : "w-full h-48 mb-4 object-cover"
                } rounded`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
              <div className={`${view === "list" ? "flex-1" : " w-full"}`}>
                <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              
              <div className="flex justify-between items-center">
                 <div>
                 <p className="text-red-600 font-bold">
                  {product.price}{" "}
                  {product.originalPrice && (
                    <span className="line-through text-gray-400">
                      {product.originalPrice}
                    </span>
                  )}
               </p>
               </div>
                   <div>
                    <motion.button
                    className="text-red-600 hover:text-red-800 font-medium "
                    onClick={() => {
                      addToWishList(product);
                      showNotification(`${product.title} added to wishlist!`, 'success');
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                     <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.35 17.13C10.59 17.82 9.42003 17.82 8.66003 17.12L8.55003 17.02C3.30003 12.27 -0.129969 9.16004 3.10168e-05 5.28004C0.060031 3.58004 0.930031 1.95004 2.34003 0.990044C4.98003 -0.809956 8.24003 0.0300438 10 2.09004C11.76 0.0300438 15.02 -0.819956 17.66 0.990044C19.07 1.95004 19.94 3.58004 20 5.28004C20.14 9.16004 16.7 12.27 11.45 17.04L11.35 17.13Z" fill="#8B96A5"/>
              </svg>
                  </motion.button>
                   </div>
              </div>
                
                <div className="text-lg text-gray-500 flex gap-2 mt-1">
                  {renderStars(product.rating)}
                  <span>({product.rating.toFixed(1)})</span>
                </div>
                <div className="mt-4 flex justify-center gap-4">
                  <motion.button
                    className="text-blue-500 hover:text-blue-700 font-medium"
                    onClick={() => handleViewDetails(product)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View details
                  </motion.button>
                  <motion.button
                    className="text-green-600 hover:text-green-800 font-medium"
                    onClick={() => {
                      addToCart(product);
                      showNotification(`${product.title} added to cart!`, 'success');
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to cart
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

