import React, { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { motion, AnimatePresence } from "framer-motion";

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
      className="fixed inset-0 bg-white z-50 overflow-y-auto px-10 py-8"
    >
      {/* Alert Notification */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {alertMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-[1400px] mx-auto">
        <motion.button
          onClick={onBack}
          className="flex items-center text-blue-600 mb-6 hover:underline"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2" />
          Back to products
        </motion.button>
        <motion.div 
          className="grid grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT COLUMN: Product Images */}
          <motion.div 
            className="col-span-2"
            variants={itemVariants}
          >
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-[80%] rounded-lg object-cover mb-4 max-h-[300px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
            
            <motion.div 
              className="flex gap-2"
              variants={containerVariants}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="w-16 h-16 border rounded cursor-pointer"
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
          </motion.div>

          {/* MIDDLE COLUMN: Details */}
          <motion.div 
            className="col-span-2 space-y-6"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-2xl font-semibold text-gray-900"
              variants={itemVariants}
            >
              {product.title}
            </motion.h1>

            <motion.div 
              className="flex items-center space-x-2 text-sm text-gray-600"
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

            <motion.div className="flex">
              <motion.button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={() => handleAddToWishList(product)}
                className="bg-sky-500 hover:bg-sky-700 text-black py-2 mx-5 px-6 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WishList
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TABS */}
        <motion.div 
          className="mt-12"
          variants={itemVariants}
        >
          <div className="flex border-b">
            {["description", "reviews", "shipping", "about"].map((tab) => (
              <motion.button
                key={tab}
                className={`py-2 px-4 text-sm font-medium capitalize ${
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
              className="mt-6 text-sm text-gray-700"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === "description" && (
                <div>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                  <table className="table-auto border w-full text-sm mb-4">
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
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Some great feature name here</li>
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Duis aute irure dolor</li>
                    <li>Another feature goes here</li>
                  </ul>
                </div>
              )}
              {activeTab === "reviews" && <div>⭐ Review section goes here</div>}
              {activeTab === "shipping" && <div>🚚 Shipping information here</div>}
              {activeTab === "about" && <div>👤 About the seller content</div>}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;










