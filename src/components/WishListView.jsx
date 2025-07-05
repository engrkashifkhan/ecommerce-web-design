import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WishListView = ({ 
  wishlistItems, 
  removeFromWishList, 
  addToCart,
  onClose,
  onViewProduct
}) => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  // Animation variants
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modal = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { y: 50, opacity: 0 }
  };

  const itemAnimation = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05 }
    }),
    exit: { 
      x: 20, 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  const emptyStateAnimation = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300 
      }
    }
  };

  const notificationVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  };

  return (
    <>
      {/* Notification Toast - Responsive positioning */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`fixed z-[100] px-4 py-2 rounded-md shadow-lg
              top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto
              ${notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'}`}
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-center sm:justify-start">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="text-sm sm:text-base">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Modal - Responsive adjustments */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-lg p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto
                      mx-2 sm:mx-4 md:p-6"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2 
                className="text-xl sm:text-2xl font-bold"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring' }}
              >
                Your Wishlist
              </motion.h2>
              <motion.button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close wishlist"
              >
                &times;
              </motion.button>
            </div>
            
            {wishlistItems.length === 0 ? (
              <motion.div 
                className="text-center py-8 sm:py-10"
                variants={emptyStateAnimation}
              >
                <p className="text-gray-500 text-base sm:text-lg">Your wishlist is empty</p>
                <motion.button 
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {wishlistItems.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg"
                      variants={itemAnimation}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                        <motion.img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{item.title}</h3>
                          <p className="text-red-600 font-bold text-sm sm:text-base">
                            {item.price}
                            {item.originalPrice && (
                              <span className="line-through text-gray-400 ml-2 text-xs sm:text-sm">
                                {item.originalPrice}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 w-full sm:w-auto justify-end">
                        <motion.button
                          onClick={() => onViewProduct(item)}
                          className="text-blue-500 hover:text-blue-700 font-medium text-xs sm:text-sm px-2 py-1 sm:px-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View details
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            addToCart(item);
                            showNotification(`${item.title} added to cart!`, 'success');
                          }}
                          className="text-green-600 hover:text-green-800 font-medium text-xs sm:text-sm px-2 py-1 sm:px-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add to cart
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            removeFromWishList(item.id);
                            showNotification(`${item.title} removed from wishlist!`, 'error');
                          }}
                          className="text-red-600 hover:text-red-800 font-medium text-xs sm:text-sm px-2 py-1 sm:px-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="mt-4 sm:mt-6 flex justify-end">
                  <motion.button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WishListView;