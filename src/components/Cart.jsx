import React, { useState, useEffect } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

const CartView = ({ 
  cartItems, 
  removeFromCart, 
  addToWishList,
  onClose, 
  onCheckout,
}) => {
  const [items, setItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Show custom notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  useEffect(() => {
    const initialized = cartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setItems(initialized);
  }, [cartItems]);

  const updateQuantity = (id, newQty) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(newQty) } : item
    );
    setItems(updated);
  };

  // Move item to wishlist and remove from cart
  const moveToWishlist = (item) => {
    addToWishList(item);
    removeFromCart(item.id);
    showNotification(`${item.title} moved to wishlist!`, 'success');
    
    // Remove from local state immediately
    setItems(prevItems => prevItems.filter(i => i.id !== item.id));
  };

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const discount = 60;
  const tax = 14;
  const total = subtotal - discount + tax;

  // Animation variants
  const container = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 300,
        when: "beforeChildren"
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.05,
        type: "spring", 
        stiffness: 200 
      }
    }),
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.2 } 
    }
  };

  const notificationVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  };

  const summaryAnimation = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        type: "spring", 
        stiffness: 300 
      }
    }
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

      {/* Cart View */}
      <motion.div
        className="fixed inset-0 bg-white w-full z-50 overflow-y-auto px-8 py-6"
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Back Button */}
        <motion.button
          onClick={onClose}
          className="flex items-center text-blue-600 hover:underline mb-6 text-base"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2" /> Back to shop
        </motion.button>

        {/* Title */}
        <motion.h2 
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          My cart ({items.length})
        </motion.h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Left: Cart Items */}
          <div className="col-span-2 space-y-6">
            {items.length === 0 ? (
              <motion.div 
                className="text-center py-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
              >
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <motion.button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            ) : (
              <>
                <AnimatePresence>
                  {items.map((item, index) => {
                    const price = parseFloat(item.price.replace("$", ""));
                    const totalPrice = price * item.quantity;

                    return (
                      <motion.div
                        key={item.id}
                        className="flex justify-between border-b pb-4"
                        variants={itemAnimation}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        whileHover={{ 
                          backgroundColor: "rgba(249, 250, 251, 1)",
                          transition: { duration: 0.2 } 
                        }}
                      >
                        <div className="flex gap-4">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                          <div>
                            <h3 className="font-semibold text-base">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              Brand: {item.brand}
                            </p>
                            <p className="text-sm text-gray-400">
                              Condition: {item.condition}
                            </p>
                            <div className="mt-2 flex gap-3 text-sm">
                              <motion.button
                                onClick={() => {
                                  setItems(items.filter((i) => i.id !== item.id));
                                  removeFromCart(item.id);
                                  showNotification(`${item.title} removed from cart!`, 'error');
                                }}
                                className="text-red-500"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                Remove
                              </motion.button>
                              <motion.button 
                                onClick={() => moveToWishlist(item)}
                                className="text-blue-500 hover:text-blue-700"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                Move to WishList
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Right: Price, Qty, Total */}
                        <div className="text-right flex flex-col items-end justify-between">
                          <div>
                            <p className="font-semibold text-base">{item.price}</p>
                            <motion.select
                              className="mt-2 border rounded px-2 py-1 text-sm"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, e.target.value)}
                              whileFocus={{ scale: 1.05 }}
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                  Qty: {i + 1}
                                </option>
                              ))}
                            </motion.select>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Total: ${totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <motion.button
                  onClick={() => {
                    items.forEach((item) => removeFromCart(item.id));
                    setItems([]);
                    showNotification('All items removed from cart!', 'error');
                  }}
                  className="text-blue-600 hover:underline text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove all
                </motion.button>
              </>
            )}
          </div>

          {/* Right: Order Summary - Only show if cart has items */}
          {items.length > 0 && (
            <AnimatePresence>
              <motion.div 
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
                variants={summaryAnimation}
                initial="hidden"
                animate="visible"
              >
                <div className="mb-4">
                  <p className="font-medium mb-2 text-sm">Have a coupon?</p>
                  <div className="flex gap-2">
                    <motion.input
                      type="text"
                      className="w-full border px-3 py-2 text-sm rounded"
                      placeholder="Add coupon"
                      whileFocus={{ 
                        borderColor: "#3b82f6",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)"
                      }}
                    />
                    <motion.button 
                      className="bg-blue-600 text-white px-4 rounded text-sm hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                </div>

                <div className="border-t pt-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <motion.div 
                    className="flex justify-between text-green-600"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span>Discount:</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between text-blue-600"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>Tax:</span>
                    <span>+ ${tax.toFixed(2)}</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between border-t pt-3 text-base font-semibold"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </motion.div>
                </div>

                <motion.button
                  onClick={onCheckout}
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold text-sm"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>

                <motion.div 
                  className="flex justify-center gap-3 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    alt="mc"
                    className="w-6"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visa"
                    className="w-6"
                  />
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/apple-pay.png"
                    alt="applepay"
                    className="w-6"
                  />
                  <img
                    src="https://img.icons8.com/color/48/000000/paypal.png"
                    alt="paypal"
                    className="w-6"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <motion.div 
            className="mt-8 border-t py-3 bg-gray-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
              {[
                { icon: "🔒", title: "Secure payment", desc: "Your data is encrypted" },
                { icon: "📞", title: "Customer support", desc: "24/7 assistance available" },
                { icon: "🚚", title: "Free delivery", desc: "On all orders above $50" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="font-medium">{feature.title}</div>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CartView;