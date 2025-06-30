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

  // Show custom notification
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

      {/* Wishlist Modal */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2 
                className="text-2xl font-bold"
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
              >
                &times;
              </motion.button>
            </div>
            
            {wishlistItems.length === 0 ? (
              <motion.div 
                className="text-center py-10"
                variants={emptyStateAnimation}
              >
                <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                <motion.button 
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {wishlistItems.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      variants={itemAnimation}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-20 h-20 object-contain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-red-600 font-bold">
                            {item.price}
                            {item.originalPrice && (
                              <span className="line-through text-gray-400 ml-2">
                                {item.originalPrice}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <motion.button
                          onClick={() => onViewProduct(item)}
                          className="text-blue-500 hover:text-blue-700 font-medium"
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
                          className="text-green-600 hover:text-green-800 font-medium"
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
                          className="text-red-600 hover:text-red-800 font-medium"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <motion.button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
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