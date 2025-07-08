import React, { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductDetail = ({ product, onBack, addToCart, addToWishList, renderStars }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20 }
  };

  const imageVariants = {
    hover: { scale: 1.03, transition: { duration: 0.3 } },
    tap: { scale: 0.98 }
  };

  const alertVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Handle add to cart with alert
  const handleAddToCart = (product) => {
    addToCart(product);
    setAlertMessage(`${product.title} added to cart!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // Handle add to wishlist with alert
  const handleAddToWishList = (product) => {
    addToWishList(product);
    setAlertMessage(`${product.title} added to wishlist!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto px-4 py-4 md:px-10 md:py-8"
    >
      {/* Alert Notification */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-4 left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none md:right-4 
                       w-max max-w-[90%] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-[1400px] mx-auto">
        <motion.button
          onClick={onBack}
          className="flex items-center text-blue-600 mb-4 md:mb-6 hover:underline"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2" />
          Back to products
        </motion.button>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT COLUMN: Product Images */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex justify-center"
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full max-w-md md:w-[80%] rounded-lg object-cover mb-4 h-[300px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
            
            <div className="overflow-x-auto pb-2">
              <motion.div 
                className="flex gap-2 w-max min-w-full"
                variants={containerVariants}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className={`w-14 h-14 sm:w-16 sm:h-16 border rounded cursor-pointer flex-shrink-0 ${
                      selectedImage === i ? "border-blue-500 border-2" : ""
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    variants={itemVariants}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img
                      src={product.image}
                      alt="thumb"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* MIDDLE COLUMN: Details */}
          <motion.div 
            className="md:col-span-2 space-y-4 md:space-y-6"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-xl sm:text-2xl font-semibold text-gray-900"
              variants={itemVariants}
            >
              {product.title}
            </motion.h1>

            <motion.div 
              className="flex items-center flex-wrap gap-2 text-sm text-gray-600"
              variants={itemVariants}
            >
              {renderStars(product.rating)}
              <span>{product.rating.toFixed(1)}</span>
              <span>• {product.orders} sold</span>
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <p className="text-lg font-semibold text-red-600">{product.price}</p>
              {product.originalPrice && (
                <p className="line-through text-gray-400 text-base">
                  {product.originalPrice}
                </p>
              )}
              <p className="text-sm text-gray-500">Price is negotiable</p>
            </motion.div>

            <motion.div 
              className="text-sm space-y-1"
              variants={itemVariants}
            >
              <p><strong>Type:</strong> Classic shoes</p>
              <p><strong>Material:</strong> Plastic material</p>
              <p><strong>Design:</strong> Modern nice</p>
              <p><strong>Customization:</strong> Customized logo and packaging</p>
              <p><strong>Warranty:</strong> 2 years full warranty</p>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 sm:px-6 rounded-md flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
              <motion.button
                onClick={() => handleAddToWishList(product)}
                className="bg-sky-500 hover:bg-sky-700 text-black py-2 px-4 sm:px-6 rounded-md flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className="text-red-500" /> WishList
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TABS */}
        <motion.div 
          className="mt-8 md:mt-12"
          variants={itemVariants}
        >
          <div className="flex overflow-x-auto pb-1 border-b hide-scrollbar">
            {["description", "reviews", "shipping", "about"].map((tab) => (
              <motion.button
                key={tab}
                className={`py-2 px-4 text-sm font-medium capitalize flex-shrink-0 ${
                  activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="mt-4 md:mt-6 text-sm text-gray-700"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === "description" && (
                <div>
                  <p className="mb-4">
                    {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="table-auto border w-full text-sm mb-4 min-w-[500px]">
                      <tbody>
                        <tr className="border">
                          <td className="p-2 font-medium">Model</td>
                          <td className="p-2">#8786867</td>
                        </tr>
                        <tr className="border">
                          <td className="p-2 font-medium">Style</td>
                          <td className="p-2">Classic style</td>
                        </tr>
                        <tr className="border">
                          <td className="p-2 font-medium">Certificate</td>
                          <td className="p-2">ISO-88962112</td>
                        </tr>
                        <tr className="border">
                          <td className="p-2 font-medium">Size</td>
                          <td className="p-2">34mm x 450mm x 19mm</td>
                        </tr>
                        <tr className="border">
                          <td className="p-2 font-medium">Memory</td>
                          <td className="p-2">36GB RAM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Some great feature name here</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Duis aute irure dolor</li>
                    <li>Another feature goes here</li>
                  </ul>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      <div>
                        <h4 className="font-medium">John Doe</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          {renderStars(4.5)}
                          <span className="ml-2">2 days ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">This product exceeded my expectations! The quality is outstanding and it arrived earlier than expected.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                      <div>
                        <h4 className="font-medium">Sarah Johnson</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          {renderStars(5)}
                          <span className="ml-2">1 week ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">Absolutely love this product! It's exactly as described and works perfectly. Would definitely recommend to others.</p>
                  </div>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                      <p className="text-gray-600">Enjoy free shipping on all orders over $50. Delivery typically takes 3-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                      <p className="text-gray-600">Not satisfied? Return within 30 days for a full refund. No questions asked.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Fast Processing</h3>
                      <p className="text-gray-600">Orders placed before 3 PM EST are processed and shipped the same day.</p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "about" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div>
                      <h3 className="font-semibold text-lg">FashionHub</h3>
                      <p className="text-gray-600">Premium Fashion Retailer Since 2010</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p>At FashionHub, we believe that style shouldn't be compromised for comfort. We've been providing high-quality fashion products for over a decade, with a focus on sustainable materials and ethical manufacturing.</p>
                    <p>Our team of designers works tirelessly to create products that blend contemporary trends with timeless elegance. We're committed to customer satisfaction and stand behind every product we sell.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Trusted Seller</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Premium Quality</span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Fast Shipping</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Eco-Friendly</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Custom styles for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default ProductDetail;